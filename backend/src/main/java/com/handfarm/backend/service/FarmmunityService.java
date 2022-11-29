package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.article.ArticleRegistDto;
import com.handfarm.backend.domain.dto.article.CommentRegistDto;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface FarmmunityService {
    void registArticle(HttpServletRequest request, ArticleRegistDto articleRegistDto, String domain, String category);

    Map<String, Object> getArticleList(String domain, String category);

    Boolean likeArticle(HttpServletRequest request, Integer articleIdx);
    void updateArticle(HttpServletRequest request, Integer articleIdx, ArticleRegistDto articleRegistDto);
    Map<String, Object> getArticleDetail(HttpServletRequest request, Integer articleIdx);

    void registComment(HttpServletRequest request, Integer articleIdx, CommentRegistDto commentRegistDto);

    void deleteArticle(HttpServletRequest request, Integer articleIdx);

    void deleteComment(HttpServletRequest request, Integer articleIdx, Integer commentIdx);

    void updateComment(HttpServletRequest request, Integer articleIdx, Integer commentIdx, CommentRegistDto commentRegistDto);
}
