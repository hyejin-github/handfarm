package com.handfarm.backend.service.impl;

import com.google.gson.JsonObject;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.domain.dto.device.ControlInfoDto;
import com.handfarm.backend.domain.dto.device.SensorLogDto;
import com.handfarm.backend.domain.entity.*;
import com.handfarm.backend.repository.*;
import com.handfarm.backend.service.DeviceService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
public class DeviceServiceImpl implements DeviceService {



    private final DeviceRepository deviceRepository;
    private final KakaoService kakaoService;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final UserDeviceRepository userDeviceRepository;
    private final DeviceSensorRepository deviceSensorRepository;
    private final DeviceControlRepository deviceControlRepository;
    private final ControlRepository controlRepository;
    private final DeviceSensorLogRepository deviceSensorLogRepository;
    private final SensorRepository sensorRepository;

    @Autowired
    DeviceServiceImpl(DeviceRepository deviceRepository, KakaoService kakaoService, UserRepository userRepository, CropRepository cropRepository, UserDeviceRepository userDeviceRepository, DeviceSensorRepository deviceSensorRepository, DeviceControlRepository deviceControlRepository, ControlRepository controlRepository, DeviceSensorLogRepository deviceSensorLogRepository, SensorRepository sensorRepository){
        this.deviceRepository= deviceRepository;
        this.kakaoService = kakaoService;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.deviceSensorRepository = deviceSensorRepository;
        this.deviceControlRepository = deviceControlRepository;
        this.controlRepository = controlRepository;
        this.deviceSensorLogRepository = deviceSensorLogRepository;
        this.sensorRepository = sensorRepository;
    }
    @Override
    public void registDevice(DeviceRegistDto deviceRegistDto){       // 기기 등록
        DeviceEntity deviceEntity = DeviceEntity.builder()
                .deviceCrops(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()))
                .deviceNo(deviceRegistDto.getDeviceNo())
                .build();
        deviceRepository.save(deviceEntity);
    }

    @Override
    public boolean userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) {

            String email = kakaoService.decodeToken(request.getHeader("accessToken"));
            Optional<UserEntity> userEntity = userRepository.findByUserId(email);
            Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());
            if(userEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();

            if(userDeviceRepository.findByDeviceIdxAndUserIdx(deviceEntity.get(), userEntity.get()) != null){
                throw new NoSuchElementException();
            }

            deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
            deviceEntity.get().setCrop(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
            deviceRepository.save(deviceEntity.get());

            userEntity.get().setDevice(deviceEntity.get());
            UserDeviceEntity userDeviceEntity = new UserDeviceEntity();
            userDeviceEntity.setDeviceIdx(deviceEntity.get());
            userDeviceEntity.setUserIdx(userEntity.get());
            userDeviceRepository.save(userDeviceEntity);
            userRepository.save(userEntity.get());

            for(int i=1; i<=4; i++){
                Optional<ControlEntity> controlEntity = controlRepository.findById(i);
                if(controlEntity.isEmpty()) throw new NoSuchElementException();
                String control = "";
                if(i==1){
                    control = deviceEntity.get().getCrop().getCropTemp();
                }else if(i==2){
                    control = deviceEntity.get().getCrop().getCropCo2();
                }else if(i==3){
                    control = deviceEntity.get().getCrop().getCropSoilHumidity();
                }else {
                    control = deviceEntity.get().getCrop().getCropLed();
                }
                DeviceControlEntity deviceControlEntity = DeviceControlEntity.builder().deviceIdx(deviceEntity.get()).controlIdx(controlEntity.get())
                        .autoControlval(control).autoControl(1).build();
                deviceControlRepository.save(deviceControlEntity);
            }
            return true;

    }

    @Override
    public Boolean deviceUpdate(HttpServletRequest request, DeviceRegistDto deviceRegistDto){
        try {
            Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceRegistDto.getDeviceNo());
            if(deviceEntity.isEmpty()) throw new NoSuchElementException();
            deviceEntity.get().setDeviceName(deviceRegistDto.getDeviceName());
            deviceEntity.get().setCrop(cropRepository.findByCropName(deviceRegistDto.getDeviceCrops()));
            deviceRepository.save(deviceEntity.get());
            return true;
        } catch (NoSuchElementException e){
            return false;
        }
    }


    @Override
    public JsonObject deviceAutoControl(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        Integer value = (Integer) dto.getControlValue();
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setAutoControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);
        return object;
    }

    @Override
    public JsonObject deviceAutoControlValue(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        String value = String.valueOf(dto.getControlValue());
        String[] values = value.split(" ");
        value = "";
        for(String spValue : values){
            value = value+spValue;
        }
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setAutoControlval(value);

        deviceControlRepository.save(deviceControlEntity.get());
        control = controlEntity.get().getControlArea();
        JsonObject object = new JsonObject();
        if(control.equals("co2") || control.equals("soilHumidity")){
            object.addProperty(control, String.format("%.1f", value));
        }else {
            object.addProperty(control, value);
        }
        return object;
    }

    @Override
    public JsonObject deviceManual(String deviceNo, DedviceAutoControlDto dto) {
        String control = dto.getControlName();
        Integer value = (Integer) dto.getControlValue();
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(control);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(controlEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();
        Optional<DeviceControlEntity> deviceControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), controlEntity.get());
        if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
        deviceControlEntity.get().setManualControl(value);

        deviceControlRepository.save(deviceControlEntity.get());
        JsonObject object = new JsonObject();
        object.addProperty(control, value);

        return object;
    }

    @Override
    public Map<String, Object> getUserDeviceAll(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();

        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        if(userEntity.isEmpty()) throw new NoSuchElementException();
        List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(userEntity.get());
        List<String> deviceNoList = new ArrayList<>();
        Map<String, Object> deviceAll = new HashMap<>();
        for(UserDeviceEntity userDeviceEntity : userDeviceEntityList){
            deviceNoList.add(userDeviceEntity.getDeviceIdx().getDeviceNo());
            Map<String, Object> deviceMap = new HashMap<>();
            deviceMap.put("deviceName", userDeviceEntity.getDeviceIdx().getDeviceName());
            deviceMap.put("cropName", userDeviceEntity.getDeviceIdx().getCrop().getCropName());
            deviceMap.put("deviceLatitude", userDeviceEntity.getDeviceIdx().getDeviceLatitude());
            deviceMap.put("deviceLong", userDeviceEntity.getDeviceIdx().getDeviceLong());
            deviceMap.put("deviceCamera", userDeviceEntity.getDeviceIdx().getDeviceCamera());
            deviceAll.put(userDeviceEntity.getDeviceIdx().getDeviceNo(), deviceMap);
        }
        resultMap.put("deviceInfo", deviceAll);
        resultMap.put("deviceNo", deviceNoList);

        return resultMap;
    }
    @Override
    public Map<String, Object> getDeviceManual(HttpServletRequest request, String deviceNo){
        Map<String, Object> resultMap = new HashMap<>();

        Optional<DeviceEntity> device = deviceRepository.findByDeviceNo(deviceNo);
        if(device.isEmpty()) throw new NoSuchElementException();
        List<Optional<DeviceControlEntity>> deviceControlList = deviceControlRepository.findByDeviceIdx(device.get());

        for(Optional<DeviceControlEntity> deviceControlEntity : deviceControlList){
            if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
            Map<String, Object> controlMap = new HashMap<>();
            controlMap.put("auto", deviceControlEntity.get().getAutoControl());
            controlMap.put("manual", deviceControlEntity.get().getManualControl());
            resultMap.put(deviceControlEntity.get().getControlIdx().getControlName(), controlMap);
        }

        return resultMap;
    }

    @Override
    public Map<String, Object> getDeviceSensor(String userEmail) {
        Map<String, Object> resultMap = new HashMap<>();
        Optional<UserEntity> userEntity = userRepository.findByUserId(userEmail);
        if(userEntity.isEmpty()) throw new NoSuchElementException();
        for(UserDeviceEntity userDeviceEntity : userDeviceRepository.findByUserIdx(userEntity.get())){
            List<DeviceSensorEntity> deviceSensorEntityList = deviceSensorRepository.findByDeviceIdx(userDeviceEntity.getDeviceIdx());
            Map<String, Object> map = new HashMap<>();
            for(DeviceSensorEntity deviceSensorEntity : deviceSensorEntityList){
                String sensorName = deviceSensorEntity.getSensorIdx().getSensorArea();
                Float sensorValue = deviceSensorEntity.getValue();
                map.put(sensorName, sensorValue);
            }
            resultMap.put(userDeviceEntity.getDeviceIdx().getDeviceNo(), map);
        }
        return resultMap;
    }

    @Override
    public Map<String, Object> resetAutoValue(String deviceNo, DedviceAutoControlDto controlDto){
        Map<String, Object> resultMap = new HashMap<>();
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<ControlEntity> controlEntity = controlRepository.findByControlName(controlDto.getControlName());
        if(deviceEntity.isEmpty() || controlEntity.isEmpty()) throw new NoSuchElementException();
        String control = "";
        if(controlDto.getControlName().equals("temp")){
            control = deviceEntity.get().getCrop().getCropTemp();
        }else if(controlDto.getControlName().equals("fan")){
            control = deviceEntity.get().getCrop().getCropCo2();
        }else if(controlDto.getControlName().equals("pump")){
            control = deviceEntity.get().getCrop().getCropSoilHumidity();
        }else if(controlDto.getControlName().equals("led")){
            control = deviceEntity.get().getCrop().getCropLed();
        }else{
            throw new NoSuchElementException();
        }
        if(control == null) throw new NoSuchElementException();
        Optional<ControlEntity> tempControl = controlRepository.findByControlName(controlDto.getControlName());
        Optional<DeviceControlEntity> tempControlEntity = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity.get(), tempControl.get());
        tempControlEntity.get().setAutoControlval(control);
        deviceControlRepository.save(tempControlEntity.get());
        resultMap.put("controlValue", control);

        return resultMap;
    }
    @Override
    public Map<String,Object> getAutoValue(HttpServletRequest request, String userNickname){
        Map<String, Object> resultMap = new HashMap<>();

        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));

        Optional<UserEntity> myUserEntity = userRepository.findByUserId(userId);
        Optional<UserEntity> getUserEntity = userRepository.findByUserNickname(userNickname);
        if(myUserEntity.isEmpty() || getUserEntity.isEmpty()) throw new NoSuchElementException();

        if(!myUserEntity.equals(getUserEntity) && !getUserEntity.get().getUserOpen()) {
            resultMap.put("message", "conceal");
        }else {
            List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(getUserEntity.get());
            for(UserDeviceEntity userDeviceEntity : userDeviceEntityList){
                List<Optional<DeviceControlEntity>> deviceControlEntitylist = deviceControlRepository.findByDeviceIdx(userDeviceEntity.getDeviceIdx());
                if(deviceControlEntitylist.isEmpty()) throw new NoSuchElementException();
                Map<String ,Object> autoValue = new HashMap<>();
                for (Optional<DeviceControlEntity> deviceControlEntity : deviceControlEntitylist) {
                    if(deviceControlEntity.isEmpty()) throw new NoSuchElementException();
                    String controlName = deviceControlEntity.get().getControlIdx().getControlName();
                    String controlAutoValue = deviceControlEntity.get().getAutoControlval();
                    autoValue.put(controlName, controlAutoValue);
                }
                resultMap.put(userDeviceEntity.getDeviceIdx().getDeviceNo(), autoValue);
            }
        }
        return resultMap;
    }

    @Override
    public Map<String, Object> getSensorLog(String deviceNo, String sensor, String day) {
        Map<String ,Object> resultMap = new HashMap<>();
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        Optional<SensorEntity> sensorEntity = sensorRepository.findBySensorArea(sensor);
        List<Map<String, Object>> resultList = new ArrayList<>();
        if(deviceEntity.isEmpty() || sensorEntity.isEmpty()) throw new NoSuchElementException();
        ArrayList<SensorLogDto> sensorLogList;
        LocalDateTime startDateTime;
        LocalDateTime endDateTime = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        if(day.equals("day")){
            startDateTime = endDateTime.minusDays(7);
            sensorLogList = deviceSensorLogRepository.findByDayValue(deviceEntity.get(), sensorEntity.get(), startDateTime, endDateTime);
            for(SensorLogDto sensorLogDto : sensorLogList){
                Map<String, Object> logMap = new HashMap<>();
                String[] str = sensorLogDto.getLogTime().split("-");
                logMap.put("logDate", str[1]+"월 "+Integer.valueOf(str[2])+"일");
                logMap.put("avgValue",  Float.valueOf(String.format("%.1f", sensorLogDto.getAvgValue())));
                resultList.add(logMap);
            }
            resultMap.put("sensorLogList", resultList);

        }else if(day.equals("hour")){
            startDateTime = endDateTime.minusDays(1);
            sensorLogList = deviceSensorLogRepository.findByHourValue(deviceEntity.get(), sensorEntity.get(), startDateTime, endDateTime);
            for(SensorLogDto sensorLogDto : sensorLogList){
                Map<String, Object> logMap = new HashMap<>();
                String[] str = sensorLogDto.getLogTime().split(" ");
                logMap.put("logDay",str[0]);
                logMap.put("logTime", str[1]+"시");
                logMap.put("avgValue", Float.valueOf(String.format("%.1f", sensorLogDto.getAvgValue())));
                resultList.add(logMap);
            }
            resultMap.put("sensorLogList", resultList);
        }else{
            throw new NoSuchElementException();
        }

        return resultMap;
    }

    @Override
    public void getSensorValue(HttpServletRequest request, String userNickname, ControlInfoDto sensorInfoDto) {
        Optional<DeviceEntity> deviceOptional = deviceRepository.findByDeviceNo(sensorInfoDto.getDeviceNo());
        Optional<ControlEntity> controlOptional = controlRepository.findByControlName(sensorInfoDto.getControlName());
        if(deviceOptional.isEmpty() || controlOptional.isEmpty()) throw new NoSuchElementException();
        DeviceEntity deviceEntity = deviceOptional.get();
        ControlEntity controlEntity = controlOptional.get();

        Optional<DeviceControlEntity> deviceControlEntityOptional = deviceControlRepository.findByDeviceIdxAndControlIdx(deviceEntity, controlEntity);
        if(deviceControlEntityOptional.isEmpty()) throw new NoSuchElementException();
        DeviceControlEntity deviceControlEntity = deviceControlEntityOptional.get();

        deviceControlEntity.setAutoControlval(sensorInfoDto.getControlValue());
        deviceControlRepository.save(deviceControlEntity);
    }

    @Override
    public void deleteDevice(HttpServletRequest request, String deviceNo){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        Optional<DeviceEntity> deviceEntity = deviceRepository.findByDeviceNo(deviceNo);
        if(userEntity.isEmpty() || deviceEntity.isEmpty()) throw new NoSuchElementException();

        UserDeviceEntity userDeviceEntity = userDeviceRepository.findByDeviceIdxAndUserIdx(deviceEntity.get(), userEntity.get());

        userDeviceRepository.delete(userDeviceEntity);
    }
}
