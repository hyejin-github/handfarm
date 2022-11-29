package com.handfarm.backend.service.impl;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;
import com.handfarm.backend.domain.entity.NoticeEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.NoticeRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NoticeServiceImpl implements NoticeService {

    private UserRepository userRepository;
    private NoticeRepository noticeRepository;
    private final KakaoService kakaoService;

    @Autowired
    NoticeServiceImpl(UserRepository userRepository, NoticeRepository noticeRepository, KakaoService kakaoService){
        this.userRepository = userRepository;
        this.noticeRepository = noticeRepository;
        this.kakaoService = kakaoService;
    }
    @Override
    public Long getCountNotice(HttpServletRequest request) {
        UserEntity userEntity = getUserEntity(request);

        return noticeRepository.countByToUserAndIsRead(userEntity, false);
    }

    @Override
    public List<NoticeViewDto> getNoticeList(HttpServletRequest request) {
        List<NoticeViewDto> noticeList = new ArrayList<>();
        UserEntity userEntity = getUserEntity(request);

        List<NoticeEntity> list = noticeRepository.findByToUser(userEntity);
        // 알림 존재
        if(!list.isEmpty()){
            for(NoticeEntity n : list){
                NoticeViewDto noticeViewDto = NoticeViewDto.builder().idx(n.getIdx())
                        .noticeType(n.getNoticeType())
                        .articeIdx(n.getIdx())
                        .noticeTime(n.getNoticeTime())
                        .userNickname(n.getToUser().getUserNickname())
                        .fromUserNickname(n.getFromUser().getUserNickname())
                        .isRead(n.getIsRead()).build();
                noticeList.add(noticeViewDto);
            }
        }
        return noticeList;
    }

    @Override
    public boolean readNotice(HttpServletRequest request, Integer idx) {
        UserEntity userEntity = getUserEntity(request);
        Optional<NoticeEntity> noticeEntityOptional = noticeRepository.findByToUserAndIdx(userEntity, idx);
        if(noticeEntityOptional.isPresent()) {
            NoticeEntity notice = noticeEntityOptional.get();
            notice.setIsRead(true);
            noticeRepository.save(notice);

            if (notice.getIsRead()) return true;
        }
        return false;
    }

    @Override
    public boolean deleteNotice(HttpServletRequest request, Integer idx) {
        UserEntity userEntity = getUserEntity(request);
        Optional<NoticeEntity> noticeEntityOptional = noticeRepository.findByToUserAndIdx(userEntity, idx);
        if(noticeEntityOptional.isPresent()){
            NoticeEntity notice = noticeEntityOptional.get();
            if(notice != null) noticeRepository.delete(notice);
            if(!noticeRepository.findByToUserAndIdx(userEntity,idx).isPresent()) return true;
        }
        return false;
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);

        if(userEntity.isPresent())  return userEntity.get();
        else return null;
    }
}
