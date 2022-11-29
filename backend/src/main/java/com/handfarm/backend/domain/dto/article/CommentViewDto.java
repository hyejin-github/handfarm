package com.handfarm.backend.domain.dto.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentViewDto {
    private String commentContent;
    private Integer idx;
    private LocalDateTime commentTime;
    private String userNickName;
    private String userProfileImg;
}
