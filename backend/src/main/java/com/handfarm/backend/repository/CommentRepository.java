package com.handfarm.backend.repository;

import com.handfarm.backend.domain.entity.ArticleEntity;
import com.handfarm.backend.domain.entity.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {

    List<CommentEntity> findByArticleIdx(ArticleEntity article);

    Integer countByArticleIdx(ArticleEntity article);
}
