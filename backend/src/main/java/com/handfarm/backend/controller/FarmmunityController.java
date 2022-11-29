package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;
import com.handfarm.backend.service.FarmmunityService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FarmmunityController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "accessToken timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private HttpStatus status;
    private final FarmmunityService farmmunityService;
    private final KakaoService kakaoService;

    @Autowired
    FarmmunityController(FarmmunityService farmmunityService, KakaoService kakaoService){
        this.farmmunityService = farmmunityService;
        this.kakaoService = kakaoService;
    }

    @PostMapping("/community/{domain}/{category}") // 게시글 작성
    public ResponseEntity<Map<String, Object>> registArticle(HttpServletRequest request, @RequestBody ArticleRegistDto articleRegistDto, @PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.registArticle(request, articleRegistDto, domain, category);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/community/{domain}/{category}") // 게시글 카테고리 별 조회
    public ResponseEntity<Map<String, Object>> getArticleList(HttpServletRequest request, @PathVariable("domain") String domain, @PathVariable("category") String category){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(farmmunityService.getArticleList(domain, category));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/community/{article_idx}") // 게시글 상세조회
    public ResponseEntity<Map<String, Object>> getArticleDetail(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        String ISLIKECLICKED = "isLikeClicked";
        if(checkToken(request, resultMap)){
            try{
                Map<String, Object> articleDto = farmmunityService.getArticleDetail(request, articleIdx);
                resultMap.put("articleDto", articleDto.get("articleDetail"));
                resultMap.put("commentList", articleDto.get("commentList"));
                if(articleDto.get(ISLIKECLICKED) != null) resultMap.put(ISLIKECLICKED, articleDto.get(ISLIKECLICKED));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("community/{article_idx}") // 게시글 수정
    public ResponseEntity<Map<String, Object>> updateArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @RequestBody ArticleRegistDto articleRegistDto){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.updateArticle(request, articleIdx, articleRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}") // 게시글 삭제
    public ResponseEntity<Map<String, Object>> deleteArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.deleteArticle(request, articleIdx);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/community/{articleIdx}/comment") // 댓글 등록
    public ResponseEntity<Map<String, Object>> registComment(HttpServletRequest request, @RequestBody CommentRegistDto commentRegistDto, @PathVariable("articleIdx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.registComment(request, articleIdx, commentRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("community/{article_idx}/comment/{comment_idx}") // 댓글 수정
    public ResponseEntity<Map<String, Object>> updateComment(HttpServletRequest request, @RequestBody CommentRegistDto commentRegistDto, @PathVariable("article_idx") Integer articleIdx, @PathVariable("comment_idx") Integer commentIdx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.updateComment(request, articleIdx, commentIdx, commentRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("community/{article_idx}/comment/{comment_idx}") // 댓글 삭제
    public ResponseEntity<Map<String, Object>> deleteComment(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx, @PathVariable("comment_idx") Integer commentIdx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                farmmunityService.deleteComment(request, articleIdx, commentIdx);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("community/{article_idx}/like") // 좋아요,좋아요취소
    public ResponseEntity<Map<String, Object>> likeArticle(HttpServletRequest request, @PathVariable("article_idx") Integer articleIdx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                Boolean isLikeClick = farmmunityService.likeArticle(request, articleIdx);
                resultMap.put("isLikeClick", isLikeClick);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    public Boolean checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        try{
            kakaoService.CheckAccessToken(request.getHeader(ACCESSTOKEN));
            return true;
        }catch (IOException e){
            e.printStackTrace();
            if(request.getHeader(ACCESSTOKEN) !=null){
                resultMap.put(MESSAGE, TIMEOUT);
            }else{
                resultMap.put(MESSAGE, "acessToken is empty");
            }
            status = status401;
            return false;
        }
    }
}
