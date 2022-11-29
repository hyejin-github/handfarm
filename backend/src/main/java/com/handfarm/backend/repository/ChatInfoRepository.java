package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ChatInfoEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ChatInfoRepository extends JpaRepository<ChatInfoEntity, Integer> {

    @Query(value = "select ci from ChatInfoEntity as ci where (ci.personA = :personA or ci.personB = :personA) and (ci.personA = :personB or ci.personB = :personB)")
    Optional<ChatInfoEntity> findByPersonAOrPersonB(UserEntity personA, UserEntity personB);

    @Query(value = "select ci from ChatInfoEntity as ci where (ci.personA =:user or ci.personB = :user)")
    List<ChatInfoEntity> findByUserChatInfo(UserEntity user);

    ChatInfoEntity findByIdx(Integer valueOf);
}
