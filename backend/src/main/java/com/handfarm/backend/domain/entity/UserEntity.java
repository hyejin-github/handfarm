package com.handfarm.backend.domain.entity;

import lombok.Builder;
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
@Table(name="users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="user_nickname")
    private String userNickname;

    @Column(name="user_id")
    private String userId;

    @Column(name="user_profile")
    private String userProfile;

    @Column(name="user_open")
    private Boolean userOpen;

    @ManyToOne
    @JoinColumn(name="device_idx")
    private DeviceEntity device;

    @Builder
    public UserEntity(String userId, String userNickname){
        this.userId = userId;
        this.userNickname = userNickname;
    }

}
