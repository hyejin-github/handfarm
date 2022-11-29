package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api")
public class MyFarmController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private HttpStatus status;

    private final DeviceService deviceService;
    private final KakaoService kakaoService;

    @Autowired
    public MyFarmController(DeviceService deviceService, KakaoService kakaoService) {
        this.deviceService = deviceService;
        this.kakaoService = kakaoService;
    }
    @PostMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceRegister(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.userRegistDevice(request, deviceRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/farm")
    public ResponseEntity<Map<String, Object>> deviceUpdate(HttpServletRequest request, @RequestBody DeviceRegistDto deviceRegistDto) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.deviceUpdate(request, deviceRegistDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @GetMapping("/farm")
    public ResponseEntity<Map<String, Object>> userDeviceGet(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getUserDeviceAll(request));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @DeleteMapping("/farm/{deviceNo}")
    public ResponseEntity<Map<String ,Object>> deleteDevice(HttpServletRequest request, @PathVariable String deviceNo){
        Map<String ,Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.deleteDevice(request, deviceNo);
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
