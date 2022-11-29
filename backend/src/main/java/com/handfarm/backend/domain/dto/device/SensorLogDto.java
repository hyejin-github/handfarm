package com.handfarm.backend.domain.dto.device;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class SensorLogDto {

    @Id
    @Column
    private String logTime;

    @Column
    private Double avgValue;
}
