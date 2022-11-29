//package com.handfarm.backend;
//
//import com.handfarm.backend.domain.dto.notice.NoticeViewDto;
//import com.handfarm.backend.domain.entity.NoticeEntity;
//import com.handfarm.backend.domain.entity.UserEntity;
//import com.handfarm.backend.repository.NoticeRepository;
//import com.handfarm.backend.repository.UserRepository;
//import com.handfarm.backend.service.NoticeService;
//import org.junit.jupiter.api.Disabled;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.HttpStatus;
//
//import java.util.*;
//
//@SpringBootTest
//public class NoticeServiceTest {
//    private static final String success = "success";
//    private static final String fail = "error";
//    private static final String timeOut = "access-token timeout";
//    private static HttpStatus status = HttpStatus.NOT_FOUND; // 404에러
//
//    private NoticeService noticeService;
//    private UserRepository userRepository;
//    private NoticeRepository noticeRepository;
//
//    @Autowired
//    NoticeServiceTest(NoticeService noticeService, UserRepository userRepository, NoticeRepository noticeRepository){
//        this.noticeService = noticeService;
//        this.userRepository = userRepository;
//        this.noticeRepository = noticeRepository;
//    }
//
//    @Test
//    public void 읽지않은_알림개수_조회_테스트(){
//        String testId = "aa981204@daum.net";
//
//        Map<String, Object> resultMap = new HashMap<>();
//
//        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(testId);
//        if(userEntityOptional.isPresent()){
//            UserEntity userEntity = userEntityOptional.get();
//            Long count = noticeRepository.countByToUserAndIsRead(userEntity,false);
//
//            System.out.println("알림 개수 : " + count);
//
//            resultMap.put("count", count);
//            resultMap.put("message", success);
//            status = HttpStatus.OK;
//        }else{
//            resultMap.put("message", fail);
//            status = HttpStatus.INTERNAL_SERVER_ERROR;
//        }
//
//        System.out.println(resultMap);
//    }
//
//    @Test
//    public void 전체알림조회_테스트(){
//        String testId = "aa981204@daum.net";
//
//        Map<String, Object> resultMap = new HashMap<>();
//        List<NoticeViewDto> noticeList = new ArrayList<>();
//
//        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(testId);
//        if(userEntityOptional.isPresent()){
//            UserEntity userEntity = userEntityOptional.get();
//            System.out.println("userNickname : " + userEntity.getUserNickname());
//            List<NoticeEntity> list = noticeRepository.findByToUser(userEntity);
//            // 알림 존재
//            if(!list.isEmpty()){
//                for(NoticeEntity n : list){
//                    NoticeViewDto noticeViewDto = NoticeViewDto.builder().idx(n.getIdx())
//                            .noticeType(n.getNoticeType())
//                            .articeIdx(n.getIdx())
//                            .noticeTime(n.getNoticeTime())
//                            .userNickname(n.getToUser().getUserNickname())
//                            .fromUserNickname(n.getFromUser().getUserNickname())
//                            .isRead(n.getIsRead()).build();
//                    noticeList.add(noticeViewDto);
//                }
//            }else{ // 알림 없음
//                noticeList = null;
//            }
//        }
//
//        resultMap.put("message",success);
//        if(noticeList != null){
//            resultMap.put("noticeList", noticeList);
//        }else{
//            resultMap.put("noticeList", new ArrayList<>());
//        }
//
//        System.out.println(resultMap.toString());
//    }
//
//    @Test
//    public void 알림_읽음_테스트(){
//        String testId = "aa981204@daum.net";
//        Integer noticeIdx = 1;
//
//        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(testId);
//        if(userEntityOptional.isPresent()) {
//            UserEntity userEntity = userEntityOptional.get();
//            NoticeEntity notice = noticeRepository.findByToUserAndIdx(userEntity, noticeIdx).get();
//
//            // 읽음처리
//            notice.setIsRead(true);
//            // DB저장
//            noticeRepository.save(notice);
//        }
//    }
//
//    @Test
//    @Disabled
//    public void 알림_삭제_테스트(){
//        String testId = "aa981204@daum.net";
//        Integer noticeIdx = 1;
//
//        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(testId);
//        if(userEntityOptional.isPresent()){
//            UserEntity userEntity = userEntityOptional.get();
//            NoticeEntity notice = noticeRepository.findByToUserAndIdx(userEntity, noticeIdx).get();
//            if(notice != null){
//                noticeRepository.delete(notice);
//            }
//
//            Optional<NoticeEntity> noticeOptional = noticeRepository.findByToUserAndIdx(userEntity, noticeIdx);
//            if(!noticeOptional.isPresent()) System.out.println("==== 삭제 성공! ====");
//        }
//    }
//}
