package com.handfarm.backend.service;

import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.UserEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ChatService {

    List<ChatListViewDto> getChatList(HttpServletRequest request);

    List<ChatDetailDto> getChatDetail(HttpServletRequest request, String roomId);

    UserEntity getToUser(HttpServletRequest request, String roomId);

    String createChatRoom(HttpServletRequest request, String userNickname);

    void saveMessageRedis(ChatDto chatDto);

    Integer getNotReadCount(HttpServletRequest request);
}
