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
public class ArticleViewDto {
    private Integer idx;
    private String articleTitle;
    private String articleImg;
    private Integer likeCount;
    private Integer commentCount;
    private String articleContent;
    private LocalDateTime articleTime;
}
