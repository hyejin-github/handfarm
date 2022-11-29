package com.handfarm.backend.domain.entity;


import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@DynamicUpdate
@DynamicInsert
@Table(name="devices_sensors_log")
public class DeviceSensorLogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name = "device_idx")
    private DeviceEntity device;

    @ManyToOne
    @JoinColumn(name = "sensor_idx")
    private SensorEntity sensor;

    private Float value;

    private LocalDateTime time;
}
