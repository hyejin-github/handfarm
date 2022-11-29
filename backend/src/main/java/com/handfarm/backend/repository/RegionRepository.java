package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.RegionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegionRepository extends JpaRepository<RegionEntity, Integer> {
    RegionEntity findByRegionName(String category);
}
