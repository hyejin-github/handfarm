package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.CropEntity;
import com.handfarm.backend.domain.entity.DeviceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceRepository extends JpaRepository<DeviceEntity, Integer> {
    Optional<DeviceEntity> findByDeviceNo(String deviceNo);

    Integer countByCrop(CropEntity crop);
}
