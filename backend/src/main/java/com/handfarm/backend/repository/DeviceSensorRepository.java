package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.DeviceSensorEntity;
import com.handfarm.backend.domain.entity.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceSensorRepository extends JpaRepository<DeviceSensorEntity, Integer> {
    Optional<DeviceSensorEntity>  findByDeviceIdxAndSensorIdx(DeviceEntity device, SensorEntity sensor);

    List<DeviceSensorEntity> findByDeviceIdx(DeviceEntity device);

}
