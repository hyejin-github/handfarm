package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.CropEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CropRepository extends JpaRepository<CropEntity, Integer> {
    CropEntity findByCropName(String name);
}
