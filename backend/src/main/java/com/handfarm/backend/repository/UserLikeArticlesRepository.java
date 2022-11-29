package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.domain.entity.UserLikeArticlesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikeArticlesRepository extends JpaRepository<UserLikeArticlesEntity, Integer> {
    Optional<UserLikeArticlesEntity> findByUserAndArticle(UserEntity user, ArticleEntity article);

    Integer countByArticleIdx(Integer idx);
}
