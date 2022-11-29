package com.handfarm.backend.controller;

import com.handfarm.backend.config.MqttGateway;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.ControlInfoDto;
import com.handfarm.backend.service.DeviceService;
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
public class DeviceSensorController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "access-token timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private HttpStatus status;

    private final MqttGateway mqttGateway;
    private final DeviceService deviceService;
    private final KakaoService kakaoService;
    @Autowired
    public DeviceSensorController(MqttGateway mqttGateway, DeviceService deviceService, KakaoService kakaoService) {
        this.mqttGateway = mqttGateway;
        this.deviceService = deviceService;
        this.kakaoService = kakaoService;
    }

    @GetMapping("/farm/{userEmail}")
    public ResponseEntity<Map<String, Object>> getDeviceSensor(HttpServletRequest request, @PathVariable String userEmail) throws IOException {
        Map<String , Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getDeviceSensor(userEmail));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/farm/{deviceNo}")
    public ResponseEntity<Map<String, Object>> resetAutoValue(HttpServletRequest request, @PathVariable String deviceNo, @RequestBody DedviceAutoControlDto controlDto){
        Map<String, Object> resultMap = new HashMap<>();

        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.resetAutoValue(deviceNo, controlDto));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PostMapping("/farm/{deviceNo}")
    public ResponseEntity<Map<String, Object>> publisher(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable("deviceNo") String deviceNo) {
        Map<String, Object> resultMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/autoControl";
        if(checkToken(request, resultMap)){
            try{
                String Mqttmessage = String.valueOf(deviceService.deviceAutoControl(deviceNo, dto));
                mqttGateway.sendToMqtt(Mqttmessage, topic);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }


    @PutMapping("/farm/{deviceNo}/auto")
    public ResponseEntity<Map<String, Object>> deviceAutoValue(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable String deviceNo){
        Map<String, Object> resultMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/autoControlval";
        if(checkToken(request, resultMap)){
            try{
                String Mqttmessage = String.valueOf(deviceService.deviceAutoControlValue(deviceNo, dto));
                mqttGateway.sendToMqtt(Mqttmessage, topic);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }


    @GetMapping("/farm/{userNickname}/auto")
    public ResponseEntity<Map<String ,Object>> getAutoValue(HttpServletRequest request, @PathVariable String userNickname){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getAutoValue(request, userNickname));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/farm/{userNickname}/auto/value")
    public ResponseEntity<Map<String,Object>> getSensorValue(HttpServletRequest request, @PathVariable String userNickname, @RequestBody ControlInfoDto controlInfoDto){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                deviceService.getSensorValue(request, userNickname, controlInfoDto);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @PutMapping("/farm/{deviceNo}/manual")
    public ResponseEntity<Map<String, Object>> deviceManual(HttpServletRequest request, @RequestBody DedviceAutoControlDto dto, @PathVariable String deviceNo){
        Map<String, Object> resultMap = new HashMap<>();
        String topic = "ssafy/" + deviceNo + "/manualControl";

        if(checkToken(request, resultMap)){
            try{
                String Mqttmessage = String.valueOf(deviceService.deviceManual(deviceNo, dto));
                mqttGateway.sendToMqtt(Mqttmessage, topic);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }
    @GetMapping("/farm/{deviceNo}/manual")
    public ResponseEntity<Map<String, Object>> getDeviceManual(HttpServletRequest request, @PathVariable String deviceNo){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getDeviceManual(request,deviceNo));
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/farm/{deviceNo}/log/{sensor}/{day}")
    public ResponseEntity<Map<String ,Object>> getGraphLog(HttpServletRequest request, @PathVariable String deviceNo, @PathVariable String sensor, @PathVariable String day){
        Map<String ,Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.putAll(deviceService.getSensorLog(deviceNo, sensor, day));
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
