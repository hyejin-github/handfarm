package com.handfarm.backend.domain.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@Table(name="notices")
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name="to_user_idx")
    private UserEntity toUser;

    @ManyToOne
    @JoinColumn(name="from_user_idx")
    private UserEntity fromUser;

    @ManyToOne
    @JoinColumn(name="comment_idx")
    private CommentEntity comment;

    @Column(name="notice_type")
    private String noticeType;

    @Column(name="notice_time")
    private LocalDateTime noticeTime;

    @Column(name="is_read")
    private Boolean isRead;

    @Column(name="article_idx")
    private Integer articleIdx;

    @Builder
    public NoticeEntity(UserEntity toUser, UserEntity fromUser, String noticeType, LocalDateTime noticeTime, Boolean isRead, Integer articleIdx, CommentEntity comment) {
        this.toUser = toUser;
        this.fromUser = fromUser;
        this.noticeType = noticeType;
        this.noticeTime = noticeTime;
        this.isRead = isRead;
        this.articleIdx = articleIdx;
        this.comment = comment;
    }
}
