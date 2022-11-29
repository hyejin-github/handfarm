package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChatEntity;
import org.springframework.data.repository.CrudRepository;


public interface ChatRedisRepository extends CrudRepository<ChatEntity, String> {
}
