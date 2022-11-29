package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.chat.ChatDto;
import com.handfarm.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class WebSocketChatController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;

    @Autowired
    WebSocketChatController(ChatService chatService, SimpMessagingTemplate simpMessagingTemplate){
        this.chatService = chatService;
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    // 클라이언트에서 /pub/chat 의 경로로 메시지를 보내는 요청을 하면 Controller에서 받아서 처리
    @MessageMapping("/chat")
    public void sendMessage(ChatDto chatDto){
        // 메시지를 Controller가 받아서 sub/chat/{roomId}를 구독하고 있는 클라이언트에게 메시지 전달.
        simpMessagingTemplate.convertAndSend("/sub/chat/" + chatDto.getRoomId(), chatDto);

        chatService.saveMessageRedis(chatDto); // 레디스에 정보 저장
    }
}
