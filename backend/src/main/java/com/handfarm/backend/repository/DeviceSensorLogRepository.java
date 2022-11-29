package com.handfarm.backend.repository;

import com.handfarm.backend.domain.dto.device.SensorLogDto;
import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.DeviceSensorLogEntity;
import com.handfarm.backend.domain.entity.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.ArrayList;


public interface DeviceSensorLogRepository extends JpaRepository<DeviceSensorLogEntity, Integer> {

    @Query(value = "SELECT new com.handfarm.backend.domain.dto.device.SensorLogDto(SUBSTRING(dsl.time, 1, 13) as logTime, avg(dsl.value) as avgValue) from DeviceSensorLogEntity as dsl " +
            "where dsl.device = :device and dsl.sensor = :sensor " +
            "and dsl.time BETWEEN :startDateTime and :endDateTime GROUP BY SUBSTRING(dsl.time, 1, 13) ")
    ArrayList<SensorLogDto> findByHourValue(DeviceEntity device, SensorEntity sensor, LocalDateTime startDateTime, LocalDateTime endDateTime);

    @Query(value = "SELECT new com.handfarm.backend.domain.dto.device.SensorLogDto(SUBSTRING(dsl.time, 1, 10) as logTime, avg(dsl.value) as avgValue) from DeviceSensorLogEntity as dsl " +
            "where dsl.device = :device and dsl.sensor = :sensor " +
            "and dsl.time BETWEEN :startDateTime and :endDateTime GROUP BY SUBSTRING(dsl.time, 1, 10) ")
    ArrayList<SensorLogDto> findByDayValue(DeviceEntity device, SensorEntity sensor, LocalDateTime startDateTime, LocalDateTime endDateTime);
}
