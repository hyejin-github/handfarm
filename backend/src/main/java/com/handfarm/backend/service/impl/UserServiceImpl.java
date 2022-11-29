package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.User.UserDto;
import com.handfarm.backend.domain.dto.article.ArticleViewDto;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final KakaoService kakaoService;
    private final ArticleRepository articleRepository;
    private final UserLikeArticlesRepository userLikeArticlesRepository;
    private final CommentRepository commentRepository;
    private final DeviceControlRepository deviceControlRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final DeviceRepository deviceRepository;

    @Autowired
    UserServiceImpl(UserRepository userRepository, KakaoService kakaoService, ArticleRepository articleRepository, UserLikeArticlesRepository userLikeArticlesRepository, CommentRepository commentRepository, DeviceControlRepository deviceControlRepository, UserDeviceRepository userDeviceRepository, DeviceRepository deviceRepository){
        this.userRepository = userRepository;
        this.kakaoService = kakaoService;
        this.articleRepository = articleRepository;
        this.userLikeArticlesRepository = userLikeArticlesRepository;
        this.commentRepository = commentRepository;
        this.deviceControlRepository = deviceControlRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.deviceRepository = deviceRepository;
    }
    @Override
    public String findByUserId(String decodeId) {
        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(decodeId);
        if(userEntityOptional.isPresent()){
            UserEntity userEntity = userEntityOptional.get();
            return userEntity.getUserNickname();
        }
        return null;
    }

    @Override
    public Map<String, Object> getUserInfo(HttpServletRequest request, String toUserNickname) {
        Map<String , Object> resultMap = new HashMap<>();
        List<ArticleViewDto> articleList = new ArrayList<>();
        UserEntity myUserEntity = getUserEntity(request);
        Optional<UserEntity> getUserEntity = userRepository.findByUserNickname(toUserNickname);
        if(getUserEntity.isEmpty()) throw new NoSuchElementException();

        List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(getUserEntity.get());
        List<Map<String ,Object>> devicesInfo = new ArrayList<>();
        if(myUserEntity.equals(getUserEntity.get()) || getUserEntity.get().getUserOpen()) {
            for (UserDeviceEntity userDeviceEntity : userDeviceEntityList) {
                Map<String, Object> deviceInfo = new HashMap<>();
                deviceInfo.put("deviceName", userDeviceEntity.getDeviceIdx().getDeviceName());
                deviceInfo.put("deviceCrop", userDeviceEntity.getDeviceIdx().getCrop().getCropName());
                deviceInfo.put("deviceNo", userDeviceEntity.getDeviceIdx().getDeviceNo());
                List<Optional<DeviceControlEntity>> deviceControlEntitylist = deviceControlRepository.findByDeviceIdx(userDeviceEntity.getDeviceIdx());
                Map<String, Object> autoValueMap = new HashMap<>();
                for (Optional<DeviceControlEntity> deviceControlEntity : deviceControlEntitylist) {
                    if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
                    String controlName = deviceControlEntity.get().getControlIdx().getControlName();
                    String controlAutoValue = deviceControlEntity.get().getAutoControlval();
                    autoValueMap.put(controlName, controlAutoValue);
                }
                deviceInfo.put("sensorValue", autoValueMap);
                devicesInfo.add(deviceInfo);
            }
        }
        resultMap.put("devicesInfo", devicesInfo);
        resultMap.put("userNickName", getUserEntity.get().getUserNickname());
        resultMap.put("userProfile", getUserEntity.get().getUserProfile());
        resultMap.put("userOpen", getUserEntity.get().getUserOpen());
        // 게시글 가져오기
        List<ArticleEntity> articleEntityList = articleRepository.findByUserIdx(getUserEntity.get());

        if(!articleEntityList.isEmpty()){
            for(ArticleEntity a : articleEntityList){
                ArticleViewDto articleDto = ArticleViewDto.builder().idx(a.getIdx()).articleImg(a.getArticleImg()).articleContent(a.getArticleContent()).articleTitle(a.getArticleTitle())
                        .articleTime(a.getArticleTime()).likeCount(userLikeArticlesRepository.countByArticleIdx(a.getIdx())).commentCount(commentRepository.countByArticleIdx(a)).build();
                articleList.add(articleDto);
            }
            resultMap.put("articleList", articleList);
        }else{
            resultMap.put("articleList", new ArrayList<>());
        }
        return resultMap;
    }

    @Override
    public void editUserInfo(HttpServletRequest request, UserDto userDto){

            UserEntity userEntity = getUserEntity(request);
            if(userDto.getUserNickname()!=null) {
                userEntity.setUserNickname(userDto.getUserNickname());
            }
            if(userDto.getUserProfileImg() != null) {
                userEntity.setUserProfile(userDto.getUserProfileImg());
            }
            if(userDto.getUserOpen() != null) {
                userEntity.setUserOpen(userDto.getUserOpen());
            }
            userRepository.save(userEntity);

    }

    @Override
    public void onoffUserInfo(HttpServletRequest request){
        UserEntity userEntity = getUserEntity(request);
        if(!userEntity.getUserOpen()){
            userEntity.setUserOpen(true);
            userRepository.save(userEntity);
        }else{
            userEntity.setUserOpen(false);
            userRepository.save(userEntity);
        }
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);

       if(userEntity.isPresent())  return userEntity.get();
       else return null;
    }
}
