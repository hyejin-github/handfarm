package com.handfarm.backend.domain.dto.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ArticleRegistDto {

    private String articleTitle;
    private String articleImg;
    private String articleContent;
}
