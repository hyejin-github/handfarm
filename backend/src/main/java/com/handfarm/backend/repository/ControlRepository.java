package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ControlEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ControlRepository extends JpaRepository<ControlEntity, Integer> {
    Optional<ControlEntity> findByControlName(String Name);
}
