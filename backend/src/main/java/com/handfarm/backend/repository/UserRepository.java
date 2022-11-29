package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Map;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUserId(String userId);

    Optional<UserEntity> findByUserNickname(String fromUserNickname);

    Optional<UserEntity> findByIdx(Integer userIdx);
}
