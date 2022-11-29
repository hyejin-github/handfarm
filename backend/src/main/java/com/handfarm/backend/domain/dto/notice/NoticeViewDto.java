package com.handfarm.backend.domain.dto.notice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeViewDto {
    private Integer idx;
    private String noticeType;
    private Integer articeIdx;
    private String userNickname;
    private String fromUserNickname;
    private Boolean isRead;
    private LocalDateTime noticeTime;
}
