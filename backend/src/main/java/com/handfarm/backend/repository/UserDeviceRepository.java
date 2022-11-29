package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.UserDeviceEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserDeviceRepository extends JpaRepository<UserDeviceEntity, Integer> {
    List<UserDeviceEntity> findByUserIdx(UserEntity userEntity);

    UserDeviceEntity findByDeviceIdxAndUserIdx(DeviceEntity device, UserEntity user);
}
