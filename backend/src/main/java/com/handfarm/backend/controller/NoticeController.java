package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.notice.NoticeViewDto;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class NoticeController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "accessToken timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private HttpStatus status;

    private NoticeService noticeService;
    private KakaoService kakaoService;

    @Autowired
    NoticeController(NoticeService noticeService, KakaoService kakaoService){

        this.noticeService = noticeService;
        this.kakaoService = kakaoService;
    }

    @GetMapping("/alarm/count")
    public ResponseEntity<Map<String, Object>> countNotice(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.put("noticeCount",noticeService.getCountNotice(request));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @GetMapping("/alarm") // 전체 알림 조회
    public ResponseEntity<Map<String, Object>> viewNoticeList(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                List<NoticeViewDto> list = noticeService.getNoticeList(request);
                resultMap.put("noticeList", list);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("/alarm/{notice_idx}")
    public ResponseEntity<Map<String, Object>> readNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                if (noticeService.readNotice(request, idx)) {
                    resultMap.put(MESSAGE, SUCCESS);
                    status = status200;
                }
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @DeleteMapping("/alarm/{notice_idx}")
    public ResponseEntity<Map<String, Object>> deleteNotice(HttpServletRequest request, @PathVariable("notice_idx") Integer idx){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                if (noticeService.deleteNotice(request, idx)) {
                    resultMap.put(MESSAGE, SUCCESS);
                    status = status200;
                }
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap,status);
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
