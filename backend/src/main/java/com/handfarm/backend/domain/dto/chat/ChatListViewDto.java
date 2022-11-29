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
public class ChatListViewDto {
    private String roomId;
    private String anotherUserNickname;
    private String anotherUserProfileImg;
    private String content;
    private LocalDateTime time;
    private Integer notReadCount;
}
