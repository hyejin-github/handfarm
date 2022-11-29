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
@Table(name="user_like_articles")
public class UserLikeArticlesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @ManyToOne
    @JoinColumn(name="user_idx")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name="article_idx")
    private ArticleEntity article;

    private LocalDateTime time;

    @Builder
    public UserLikeArticlesEntity(UserEntity user, ArticleEntity article) {
        this.user = user;
        this.article = article;
    }
}
