package com.handfarm.backend.domain.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="chat_infos")
public class ChatInfoEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name="person_a_idx")
    private UserEntity personA;

    @ManyToOne
    @JoinColumn(name="person_b_idx")
    private UserEntity personB;

    public ChatInfoEntity(UserEntity personA, UserEntity personB) {
        this.personA = personA;
        this.personB = personB;
    }
}
