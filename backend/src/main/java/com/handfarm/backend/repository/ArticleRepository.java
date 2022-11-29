package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CropEntity;
import com.handfarm.backend.domain.entity.RegionEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<ArticleEntity, Integer> {



    List<ArticleEntity> findByArticleCategoryAndCropIdx(String domain, CropEntity crop);

    Optional<ArticleEntity> findByIdx(Integer articleIdx);

    List<ArticleEntity> findByArticleCategoryAndRegionIdx(String domain, RegionEntity region);

    @Query(value = "SELECT ula.article FROM UserLikeArticlesEntity ula WHERE ula.article IN" +
            "(SELECT a FROM ArticleEntity a WHERE a.userIdx = :userEntity)" +
            "GROUP BY(ula.article) ORDER BY COUNT(ula) DESC, ula.article.idx DESC")
    List<ArticleEntity> findByArticleLikeTop3(UserEntity userEntity, Pageable pageable);

    List<ArticleEntity> findByUserIdx(UserEntity userEntity);
}
