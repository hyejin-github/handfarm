package com.handfarm.backend.domain.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatDetailDto {
    private String sendUserNickname;
    private String toUserNickname;
    private String msg;
    private LocalDateTime time;
    private Boolean isRead;
}
