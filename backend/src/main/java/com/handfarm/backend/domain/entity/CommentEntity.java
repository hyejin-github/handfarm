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
@Table(name="comments")
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="up_idx")
    private Integer upIdx;

    @Column(name="comment_content")
    private String commentContent;

    @Column(name="comment_time")
    private LocalDateTime commentTime;

    @Column(name="update_time")
    private LocalDateTime updateTime;

    @ManyToOne
    @JoinColumn(name="article_idx")
    private ArticleEntity articleIdx;

    @ManyToOne
    @JoinColumn(name="user_idx")
    private UserEntity userIdx;

    @Builder

    public CommentEntity(Integer idx, Integer upIdx, String commentContent, LocalDateTime commentTime, LocalDateTime updateTime, ArticleEntity articleIdx, UserEntity userIdx) {
        this.idx = idx;
        this.upIdx = upIdx;
        this.commentContent = commentContent;
        this.commentTime = commentTime;
        this.updateTime = updateTime;
        this.articleIdx = articleIdx;
        this.userIdx = userIdx;
    }
}
