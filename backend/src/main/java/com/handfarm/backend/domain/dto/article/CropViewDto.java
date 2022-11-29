package com.handfarm.backend.domain.dto.article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropViewDto {
    private String cropName;
    private String cropImg;
    private String cropDescription;
    private Integer cropUserCount;
}
