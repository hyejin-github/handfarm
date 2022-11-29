package com.handfarm.backend.domain.dto.device;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ControlInfoDto {
    private String deviceNo;
    private String controlName;
    private String controlValue;
}
