package com.handfarm.backend.domain.dto.device;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SampleAutoValueDto {
    private String cropTemp;
    private String cropSoilHumidity;
    private String cropCo2;
}
