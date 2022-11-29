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
public class ArticleDetailDto {

    private String articleUserNickname;
    private String articleUserProfile;
    private String articleTitle;
    private String articleImg;
    private String articleContent;
    private LocalDateTime articleTime;
    private Integer articleLikeCount;
}

