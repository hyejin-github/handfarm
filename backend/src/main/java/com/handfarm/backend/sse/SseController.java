package com.handfarm.backend.sse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.handfarm.backend.domain.entity.DeviceSensorEntity;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.DeviceSensorRepository;
import com.handfarm.backend.service.DeviceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api")
@Slf4j
public class SseController {

    private final SseEmitters sseEmitters;
    private final DeviceService deviceService;

    public SseController(SseEmitters sseEmitters, DeviceService deviceService) {
        this.sseEmitters = sseEmitters;
        this.deviceService = deviceService;
    }

    @GetMapping(value = "/connect/{userEmail}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(@PathVariable String userEmail) {
        SseEmitter emitter = new SseEmitter(1L);
        sseEmitters.add(emitter);
        Map<String, Object> resultMap = new HashMap<>(deviceService.getDeviceSensor(userEmail));


        try {
            emitter.send(SseEmitter.event()
                    .name("connect")
                    .data(resultMap));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(emitter);
    }

    @PostMapping("/count")
    public ResponseEntity<Void> count() {
        sseEmitters.count();
        return ResponseEntity.ok().build();
    }
}