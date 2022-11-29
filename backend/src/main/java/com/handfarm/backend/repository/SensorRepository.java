package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.SensorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SensorRepository extends JpaRepository<SensorEntity, Integer> {
    Optional<SensorEntity> findBySensorArea(String sensor);
}
