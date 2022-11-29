package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.article.*;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.FarmmunityService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class FarmmunityServiceImpl implements FarmmunityService {
    private final KakaoService kakaoService;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final DeviceRepository deviceRepository;
    private final CommentRepository commentRepository;
    private final UserLikeArticlesRepository userLikeArticlesRepository;
    private final NoticeRepository noticeRepository;
    private final RegionRepository regionRepository;

    @Autowired
    FarmmunityServiceImpl(ArticleRepository articleRepository, UserRepository userRepository, CropRepository cropRepository, DeviceRepository deviceRepository, CommentRepository commentRepository, UserLikeArticlesRepository userLikeArticlesRepository, NoticeRepository noticeRepository, RegionRepository regionRepository, KakaoService kakaoService){
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.deviceRepository = deviceRepository;
        this.commentRepository = commentRepository;
        this.userLikeArticlesRepository = userLikeArticlesRepository;
        this.noticeRepository = noticeRepository;
        this.regionRepository = regionRepository;
        this.kakaoService = kakaoService;
    }

    @Override
    public void registArticle(HttpServletRequest request, ArticleRegistDto articleRegistDto, String domain, String category) {
        String articleTitle = articleRegistDto.getArticleTitle();
        String articleImg = articleRegistDto.getArticleImg();
        String articleContent = articleRegistDto.getArticleContent();

        UserEntity user = getUserEntity(request);

        if(domain.equals("정보")) { // 딸기, 파프리카, 토마토
            CropEntity crop = cropRepository.findByCropName(category);
            ArticleEntity article = ArticleEntity.builder()
                    .articleCategory("정보")
                    .articleTitle(articleTitle)
                    .articleImg(articleImg)
                    .articleContent(articleContent)
                    .userIdx(user)
                    .cropIdx(crop).build();
            articleRepository.save(article);
        }else{ // 지역
            RegionEntity region = regionRepository.findByRegionName(category);
            ArticleEntity article = ArticleEntity.builder()
                    .articleCategory("지역")
                    .articleTitle(articleTitle)
                    .articleContent(articleContent)
                    .userIdx(user)
                    .regionIdx(region).build();
            articleRepository.save(article);
        }
    }
    
    @Override
    public void registComment(HttpServletRequest request, Integer articleIdx, CommentRegistDto commentRegistDto){
        String commentContent = commentRegistDto.getCommentContent();
        Integer upIdx = commentRegistDto.getUpIdx();

        UserEntity user = getUserEntity(request);
        Optional<ArticleEntity> article = articleRepository.findById(articleIdx);
        if(article.isEmpty()) return;

        CommentEntity comment = CommentEntity.builder()
                .upIdx(upIdx)
                .commentContent(commentContent)
                .articleIdx(article.get())
                .userIdx(user).build();
        commentRepository.save(comment);

        // 댓글 등록 시 알림 가게 - 자기가 등록한게 아니면
        if(!article.get().getUserIdx().getUserId().equals(comment.getUserIdx().getUserId())){
            NoticeEntity notice = NoticeEntity.builder()
                    .noticeType("comment")
                    .noticeTime(comment.getCommentTime())
                    .articleIdx(articleIdx)
                    .fromUser(user)
                    .comment(comment)
                    .toUser(article.get().getUserIdx()).build();
            noticeRepository.save(notice);
        }
    }

    @Override
    public void deleteArticle(HttpServletRequest request, Integer articleIdx) {
        UserEntity user = getUserEntity(request);
        Optional<ArticleEntity> article = articleRepository.findById(articleIdx);
        if(article.isEmpty()) return;

        if(user.getUserId().equals(article.get().getUserIdx().getUserId())){
            articleRepository.delete(article.get());

            // 게시글 삭제 시 관련 알림 다 삭제
            List<NoticeEntity> noticeList = noticeRepository.findByArticleIdx(articleIdx);
            if(!noticeList.isEmpty()){
                noticeRepository.deleteAllInBatch(noticeList);
            }
        }
    }

    @Override
    public void deleteComment(HttpServletRequest request, Integer articleIdx, Integer commentIdx) {
        UserEntity user = getUserEntity(request);
        Optional<CommentEntity> comment = commentRepository.findById(commentIdx);
        if(comment.isEmpty()) return;

        if(user.getUserId().equals(comment.get().getUserIdx().getUserId())){
            commentRepository.delete(comment.get());

            // 알림이 있다면 관련 알림도 삭제
            Optional<NoticeEntity> noticeEntityOptional = noticeRepository.findByFromUserAndNoticeTypeAndArticleIdxAndComment(user, "comment",articleIdx, comment.get());

            if(noticeEntityOptional.isPresent()){
                noticeRepository.delete(noticeEntityOptional.get());
            }
        }
    }

    @Override
    public Map<String, Object> getArticleDetail(HttpServletRequest request, Integer articleIdx) {
        Map<String, Object> data = new HashMap<>();
        Optional<ArticleEntity> articleOptional = articleRepository.findByIdx(articleIdx);
        if(articleOptional.isEmpty()) throw new NoSuchElementException();
        ArticleEntity article = articleOptional.get();
        List<CommentEntity> comment = commentRepository.findByArticleIdx(article);

        UserEntity user = getUserEntity(request);

        ArticleDetailDto articleDetailDto = ArticleDetailDto.builder()
                .articleUserProfile(article.getUserIdx().getUserProfile())
                .articleUserNickname(article.getUserIdx().getUserNickname())
                .articleTitle(article.getArticleTitle())
                .articleImg(article.getArticleImg())
                .articleContent(article.getArticleContent())
                .articleTime(article.getArticleTime())
                .articleLikeCount(userLikeArticlesRepository.countByArticleIdx(articleIdx))
                .build();

        data.put("articleDetail", articleDetailDto);

        if (comment.isEmpty()) {
            data.put("commentList", new ArrayList<>());
        }else{
            List<CommentViewDto> commentView = new ArrayList<>();
            for (CommentEntity c : comment) {
                CommentViewDto dto = CommentViewDto.builder()
                        .userNickName(c.getUserIdx().getUserNickname())
                        .userProfileImg(c.getUserIdx().getUserProfile())
                        .commentContent(c.getCommentContent())
                        .idx(c.getIdx())
                        .commentTime(c.getCommentTime())
                        .build();
                commentView.add(dto);
            }
            data.put("commentList", commentView);
        }

        // 좋아요 했는지 안했는지 여부
        Optional<UserLikeArticlesEntity> ula = userLikeArticlesRepository.findByUserAndArticle(user, article);
        if(ula.isPresent()) data.put("isLikeClicked", true);
        else data.put("isLikeClicked", false);

        return data;
    }

    @Override
    public Map<String, Object> getArticleList(String domain, String category) {
        Map<String, Object> res = new HashMap<>();
        List<ArticleViewDto> result = new ArrayList<>();

        if(domain.equals("정보")){ // 딸기 , 방울 토마투
            CropEntity crop = cropRepository.findByCropName(category);
            CropViewDto cropViewDto = CropViewDto.builder().cropName(crop.getCropName()).cropImg(crop.getCropImg()).
                    cropDescription(crop.getCropDescription()).cropUserCount(deviceRepository.countByCrop(crop)).build();
            List<ArticleEntity> articleInfoList = articleRepository.findByArticleCategoryAndCropIdx(domain, crop);

            if(!articleInfoList.isEmpty()){
                for(ArticleEntity a : articleInfoList){

                    ArticleViewDto article = ArticleViewDto.builder()
                            .idx(a.getIdx())
                            .articleTitle(a.getArticleTitle())
                            .articleImg(a.getArticleImg())
                            .likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx()))
                            .commentCount(commentRepository.countByArticleIdx(a))
                            .articleTime(a.getArticleTime())
                            .build();

                    result.add(article);
                }

            }else{
                result = new ArrayList<>();
            }
            res.put("articleInfo",cropViewDto);
        }else{ // 지역
            RegionEntity region = regionRepository.findByRegionName(category);
            RegionViewDto regionViewDto = RegionViewDto.builder().regionName(region.getRegionName()).regionImg(region.getRegionImg()).regionDescription(region.getRegionDescription()).build();
            List<ArticleEntity> articleRegionList = articleRepository.findByArticleCategoryAndRegionIdx(domain, region);
            if(!articleRegionList.isEmpty()){

                for(ArticleEntity a : articleRegionList){
                    ArticleViewDto article = ArticleViewDto.builder()
                            .idx(a.getIdx())
                            .articleTitle(a.getArticleTitle())
                            .articleContent(a.getArticleContent())
                            .articleImg(null)
                            .likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx()))
                            .commentCount(commentRepository.countByArticleIdx(a))
                            .articleTime(a.getArticleTime())
                            .build();

                    result.add(article);
                }
            }else{
                result = new ArrayList<>();
            }
            res.put("articleInfo", regionViewDto);
        }
        res.put("articleList",result);
        return res;
    }

    @Override
    public Boolean likeArticle(HttpServletRequest request, Integer articleIdx) {
        UserEntity user = getUserEntity(request);

        boolean result = true;
        Optional<ArticleEntity> articleOptional = articleRepository.findById(articleIdx);
        if(articleOptional.isEmpty()) return false;
        ArticleEntity article = articleOptional.get();

        Optional<UserLikeArticlesEntity> userLikeArticlesEntity = userLikeArticlesRepository.findByUserAndArticle(user, article);
        if(userLikeArticlesEntity.isPresent()){ // 좋아요 눌렀음 -> 취소
            UserLikeArticlesEntity userLikeArticle = userLikeArticlesEntity.get();
            userLikeArticlesRepository.delete(userLikeArticle);

            result = false;

            // 알림 삭제
            Optional<NoticeEntity> noticeEntityOptional = noticeRepository.findByFromUserAndArticleIdxAndNoticeType(user, articleIdx, "like");

            if(noticeEntityOptional.isPresent()){
                NoticeEntity noticeEntity = noticeEntityOptional.get();
                noticeRepository.delete(noticeEntity);
            }
        }else{
            UserLikeArticlesEntity userLikeArticles = UserLikeArticlesEntity.builder()
                    .user(user).article(article).build();

            userLikeArticlesRepository.save(userLikeArticles);

            // 알림 등록 - 자기 자신이 좋아요 누르면 알림 x
            if(!article.getUserIdx().getUserId().equals(user.getUserId())){
                NoticeEntity notice = NoticeEntity.builder()
                        .noticeType("like")
                        .noticeTime(userLikeArticles.getTime())
                        .toUser(article.getUserIdx())
                        .articleIdx(articleIdx)
                        .fromUser(user)
                        .build();
                noticeRepository.save(notice);
            }
        }
        return result;
    }

    @Override
    public void updateArticle(HttpServletRequest request, Integer articleIdx, ArticleRegistDto articleRegistDto) {
        UserEntity user = getUserEntity(request);
        Optional<ArticleEntity> articleOptional = articleRepository.findById(articleIdx);
        if(articleOptional.isEmpty()) return;
        ArticleEntity article = articleOptional.get();

        if(user.getUserId().equals(article.getUserIdx().getUserId())){
            if(article.getArticleCategory().equals("지역")){ // 이미지 없음
                RegionEntity region = regionRepository.findByRegionName(article.getRegionIdx().getRegionName());
                ArticleEntity updateArticle = ArticleEntity.builder()
                        .idx(articleIdx).articleCategory(article.getArticleCategory())
                        .regionIdx(region).articleTitle(articleRegistDto.getArticleTitle())
                        .cropIdx(article.getCropIdx())
                        .articleContent(articleRegistDto.getArticleContent()).userIdx(user)
                        .articleTime(article.getArticleTime()).articleUpdate(LocalDateTime.now()).build();

                articleRepository.save(updateArticle);
            }else{
                CropEntity crop = cropRepository.findByCropName(article.getCropIdx().getCropName());
                ArticleEntity updateArticle = ArticleEntity.builder()
                        .idx(articleIdx).articleCategory(article.getArticleCategory())
                        .regionIdx(article.getRegionIdx()).articleTitle(articleRegistDto.getArticleTitle())
                        .articleContent(articleRegistDto.getArticleContent()).userIdx(user)
                        .articleImg(articleRegistDto.getArticleImg()).cropIdx(crop)
                        .articleTime(article.getArticleTime()).articleUpdate(LocalDateTime.now()).build();

                articleRepository.save(updateArticle);
            }
        }
    }

    @Override
    public void updateComment(HttpServletRequest request, Integer articleIdx, Integer commentIdx, CommentRegistDto commentRegistDto) {
        UserEntity user = getUserEntity(request);
        Optional<ArticleEntity> article = articleRepository.findById(articleIdx);
        Optional<CommentEntity> comment = commentRepository.findById(commentIdx);
        if(article.isEmpty() || comment.isEmpty()) return;

        if(user.getUserId().equals(comment.get().getUserIdx().getUserId())){
            CommentEntity commentEntity = CommentEntity.builder()
                    .idx(comment.get().getIdx())
                    .commentContent(commentRegistDto.getCommentContent())
                    .upIdx(commentRegistDto.getUpIdx())
                    .commentTime(comment.get().getCommentTime())
                    .updateTime(LocalDateTime.now())
                    .articleIdx(article.get())
                    .userIdx(user)
                    .build();

            commentRepository.save(commentEntity);
        }
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);

        if(userEntity.isPresent())  return userEntity.get();
        else return null;
    }
}
