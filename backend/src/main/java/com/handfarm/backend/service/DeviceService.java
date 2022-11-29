package com.handfarm.backend.service;

import com.google.gson.JsonObject;
import com.handfarm.backend.domain.dto.device.DedviceAutoControlDto;
import com.handfarm.backend.domain.dto.device.DeviceRegistDto;
import com.handfarm.backend.domain.dto.device.ControlInfoDto;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Map;

public interface DeviceService {
    void registDevice(DeviceRegistDto deviceRegistDto) throws IOException;

    boolean userRegistDevice(HttpServletRequest request, DeviceRegistDto deviceRegistDto) throws IOException;

    Boolean deviceUpdate(HttpServletRequest request, DeviceRegistDto deviceRegistDto);

    JsonObject deviceAutoControl(String deviceNo, DedviceAutoControlDto dto);

    JsonObject deviceAutoControlValue(String deviceNo, DedviceAutoControlDto dto);

    JsonObject deviceManual(String deviceNo, DedviceAutoControlDto dto);

    Map<String, Object> getUserDeviceAll(HttpServletRequest request) throws IOException;

    Map<String, Object> getDeviceManual(HttpServletRequest request, String deviceNo);

    Map<String, Object> getDeviceSensor(String userEmail);

    Map<String, Object> resetAutoValue(String deviceNo, DedviceAutoControlDto controlDto);

    Map<String,Object> getAutoValue(HttpServletRequest request, String userNickname) throws IOException;

    Map<String,Object> getSensorLog(String deviceNo, String sensor, String day);

    void getSensorValue(HttpServletRequest request, String userNickname, ControlInfoDto sensorInfoDto);

    void deleteDevice(HttpServletRequest request, String deviceNo);
}
