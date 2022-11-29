package com.handfarm.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // STOMP 사용 설정
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer  {

    // 메시지 브로커에 대한 설정을 해주는 Config
    // Client에서 Websocket을 연결할 때 사용할 API 경로 설정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws")
                .setAllowedOrigins("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        // /sub 가 붙은 destination의 클라이언트에게 메시지를 보낼 수 있도록 Simple Broker 등록
        registry.enableSimpleBroker("/sub");
        // /pub 가 붙은 메시지들은 @MessageMapping이 붙은 method로 바운드
        // 클라이언트가 메시지를 보낼 때 경로 맨 앞에 /pub가 붙어있으면 Broker로 보내짐
        registry.setApplicationDestinationPrefixes("/pub");
    }
}