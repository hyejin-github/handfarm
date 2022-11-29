package com.handfarm.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@RedisHash(value="chatList")
public class ChatEntity {
    // Redis Key 값 (사용자들 id 저장)
    // 레디스에 저장된 최종 키 값 -> keyspace:id (chatList:participants)
    @Id
    private String roomId;

    private String sendUserId;
    private String toUserId;
    private String msg;
    private LocalDateTime time;
    private Boolean isRead; // 읽음처리

    @Builder
    public ChatEntity(String roomId, String sendUserId, String toUserId, String msg, LocalDateTime time, Boolean isRead) {
        this.roomId = roomId;
        this.sendUserId = sendUserId;
        this.toUserId = toUserId;
        this.msg = msg;
        this.time = time;
        this.isRead = isRead;
    }
}
