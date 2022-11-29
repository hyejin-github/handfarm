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
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor
@Table(name="crops")
public class CropEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="crop_name")
    private String cropName;

    @Column(name="crop_img")
    private String cropImg;

    @Column(name="crop_description")
    private String cropDescription;

    @Column(name = "crop_temp")
    private String cropTemp;

    @Column(name = "crop_soilhumidity")
    private String cropSoilHumidity;

    @Column(name = "crop_co2")
    private String cropCo2;

    @Column(name = "crop_led")
    private String cropLed;

}
