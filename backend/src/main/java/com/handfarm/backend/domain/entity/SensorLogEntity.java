package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="sensor_log")
public class SensorLogEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer idx;
    private String date;
    private String avgValue;
}
