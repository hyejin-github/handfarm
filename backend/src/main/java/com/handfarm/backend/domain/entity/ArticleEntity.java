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
@Table(name="articles")
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idx;

    @Column(name="article_category")
    private String articleCategory;
    @Column(name="article_title")
    private String articleTitle;
    @Column(name="article_img")
    private String articleImg;
    @Column(name="article_content")
    private String articleContent;
    @Column(name="article_time")
    private LocalDateTime articleTime;
    @Column(name="article_update")
    private LocalDateTime articleUpdate;
    @ManyToOne
    @JoinColumn(name="user_idx")
    private UserEntity userIdx;
    @ManyToOne
    @JoinColumn(name="crop_idx")
    private CropEntity cropIdx;

    @ManyToOne
    @JoinColumn(name="region_idx")
    private RegionEntity regionIdx;

    @Builder
    public ArticleEntity(Integer idx, String articleCategory, String articleTitle, String articleImg, String articleContent, LocalDateTime articleTime, LocalDateTime articleUpdate, UserEntity userIdx, CropEntity cropIdx, RegionEntity regionIdx) {
        this.idx = idx;
        this.articleCategory = articleCategory;
        this.articleTitle = articleTitle;
        this.articleImg = articleImg;
        this.articleContent = articleContent;
        this.articleTime = articleTime;
        this.articleUpdate = articleUpdate;
        this.userIdx = userIdx;
        this.cropIdx = cropIdx;
        this.regionIdx = regionIdx;
    }
}
