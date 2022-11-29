package com.handfarm.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name="devices")
public class DeviceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name = "device_no")
    private String deviceNo;

    @Column(name = "device_img")
    private String deviceImg;

    @Column(name="device_location")
    private Float deviceLoation;

    @Column(name="device_latitude")
    private Float deviceLatitude;

    @Column(name="device_long")
    private Integer deviceLong;

    @Column(name="device_name")
    private String deviceName;

    @Column(name="device_camera")
    private String deviceCamera;

    @ManyToOne
    @JoinColumn(name="crop_idx")
    private CropEntity crop;

    @Builder
    private DeviceEntity(String deviceNo, CropEntity deviceCrops){
        this.deviceNo = deviceNo;
        this.crop = deviceCrops;
    }
}
