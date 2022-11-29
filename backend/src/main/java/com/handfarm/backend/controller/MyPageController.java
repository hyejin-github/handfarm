package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.User.UserDto;
import com.handfarm.backend.service.KakaoService;
import com.handfarm.backend.service.UserService;
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
public class MyPageController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "accessToken timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private HttpStatus status;





    private final KakaoService kakaoService;
    private final UserService userService;

    @Autowired
    public MyPageController(KakaoService kakaoService, UserService userService) {

        this.kakaoService = kakaoService;
        this.userService = userService;
    }

    @GetMapping("/mypage/{userNickname}")
    public ResponseEntity<Map<String, Object>> getUserInfo(HttpServletRequest request, @PathVariable String userNickname) {
        Map<String ,Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(userService.getUserInfo(request, userNickname));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/mypage")
    public ResponseEntity<Map<String, Object>> editUserInfo(HttpServletRequest request, @RequestBody UserDto userDto){
        Map<String , Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                userService.editUserInfo(request, userDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/mypage")
    public ResponseEntity<Map<String, Object>> onoffUserInfo(HttpServletRequest request){
        Map<String , Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try {
                userService.onoffUserInfo(request);
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
