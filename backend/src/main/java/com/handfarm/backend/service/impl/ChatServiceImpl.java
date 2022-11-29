package com.handfarm.backend.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.ChatEntity;
import com.handfarm.backend.domain.entity.ChatInfoEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.ChatInfoRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.ChatService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService {

    private final UserRepository userRepository;
    private final ChatInfoRepository chatInfoRepository;
    private final RedisTemplate<String, ChatEntity> redisTemplate;
    private final KakaoService kakaoService;

    @Autowired
    ChatServiceImpl(ChatInfoRepository chatInfoRepository, UserRepository userRepository, RedisTemplate<String, ChatEntity> redisTemplate, KakaoService kakaoService){
        this.userRepository = userRepository;
        this.chatInfoRepository = chatInfoRepository;
        this.redisTemplate = redisTemplate;
        this.kakaoService = kakaoService;
    }

    @Override
    public Integer getNotReadCount(HttpServletRequest request) {
        int count = 0;
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();

        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if (!chatInfoList.isEmpty()) {
            for (ChatInfoEntity c : chatInfoList) {
                String roomId = String.valueOf(c.getIdx());
                List<ChatEntity> chat = redisTemplate.opsForList().range(roomId, 0, redisTemplate.opsForList().size(roomId));
                if(!chat.isEmpty()) {
                    for(int i=0; i<chat.size(); i++) {
                        Object chatObject = chat.get(i);

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                        mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                        ChatEntity chatEntity = mapper.convertValue(chatObject, ChatEntity.class);

                        if (chatEntity.getToUserId().equals(userId) && !chatEntity.getIsRead()) count++;
                    }
                }else{
                    continue;
                }
            }

            return count;
        }

        return count;
    }

    @Override
    public List<ChatListViewDto> getChatList(HttpServletRequest request) { // 채팅 목록 조회
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();
        List<ChatInfoEntity> chatInfoList = chatInfoRepository.findByUserChatInfo(user);

        if (!chatInfoList.isEmpty()) {
            List<ChatListViewDto> chatList = new ArrayList<>();
            for (ChatInfoEntity c : chatInfoList) {
                String roomId = String.valueOf(c.getIdx());
                List<ChatEntity> chat = redisTemplate.opsForList().range(roomId, 0, redisTemplate.opsForList().size(roomId));
                if(!chat.isEmpty()) {
                    // 읽지 않은 알림 개수
                    int cnt = 0;
                    for(int i=0; i<chat.size(); i++) {
                        Object chatObject = chat.get(i);

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                        mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                        ChatEntity chatEntity = mapper.convertValue(chatObject, ChatEntity.class);

                        if (chatEntity.getToUserId().equals(userId) && !chatEntity.getIsRead()) cnt++;
                    }
                    ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));
                    Object chatObject = chat.get(0);
                    ObjectMapper mapper = new ObjectMapper();
                    mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                    mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                    ChatEntity chatEntity = mapper.convertValue(chatObject, ChatEntity.class);

                    UserEntity personA = chatRoomInfo.getPersonA();
                    UserEntity personB = chatRoomInfo.getPersonB();
                    if (personA.getUserId().equals(userId)) {
                        ChatListViewDto chatListViewDto = ChatListViewDto.builder().roomId(chatEntity.getRoomId()).anotherUserNickname(personB.getUserNickname())
                                .content(chatEntity.getMsg()).time(chatEntity.getTime()).anotherUserProfileImg(personB.getUserProfile()).notReadCount(cnt).build();
                        chatList.add(chatListViewDto);
                    } else {
                        ChatListViewDto chatListViewDto = ChatListViewDto.builder().roomId(chatEntity.getRoomId()).anotherUserNickname(personA.getUserNickname())
                                .content(chatEntity.getMsg()).time(chatEntity.getTime()).anotherUserProfileImg(personA.getUserProfile()).notReadCount(cnt).build();
                        chatList.add(chatListViewDto);
                    }
                }else{
                    continue;
                }
            }

            return chatList;
        }

        return new ArrayList<>();
    }

    @Override
    public List<ChatDetailDto> getChatDetail(HttpServletRequest request, String roomId) { // 채팅 내용 상세 조회
        List<ChatDetailDto> chatList = new ArrayList<>();
        List<ChatEntity> chat = redisTemplate.opsForList().range(roomId, 0, redisTemplate.opsForList().size(roomId));
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();

        if(chat.isEmpty()){
            // 채팅방 없음. 빈배열 생성
            return new ArrayList<>();
        }else{
            for(int i=0; i<chat.size(); i++){
                Object chatObject = chat.get(i);

                ObjectMapper mapper = new ObjectMapper();
                mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
                mapper.registerModules(new JavaTimeModule(), new Jdk8Module());
                ChatEntity chatEntity = mapper.convertValue(chatObject, ChatEntity.class);

                // 안읽었던 내용들 읽음 처리
                if(chatEntity.getToUserId().equals(userId) && !chatEntity.getIsRead()){
                    chatEntity.setIsRead(true);
                    redisTemplate.opsForList().set(roomId, i, chatEntity);
                }

                Optional<UserEntity> sendUser = userRepository.findByUserId(chatEntity.getSendUserId());
                Optional<UserEntity> toUser = userRepository.findByUserId(chatEntity.getToUserId());
                if(sendUser.isPresent() && toUser.isPresent()) {
                    ChatDetailDto chatDetailDto = ChatDetailDto.builder()
                            .sendUserNickname(sendUser.get().getUserNickname())
                            .toUserNickname(toUser.get().getUserNickname())
                            .msg(chatEntity.getMsg())
                            .time(chatEntity.getTime())
                            .isRead(chatEntity.getIsRead())
                            .build();

                    chatList.add(chatDetailDto);
                }
            }
        }


        return chatList;
    }

    @Override
    public UserEntity getToUser(HttpServletRequest request, String roomId) {
        UserEntity user = getUserEntity(request);
        String userId = user.getUserId();
        ChatInfoEntity chatRoomInfo = chatInfoRepository.findByIdx(Integer.valueOf(roomId));

        UserEntity personA = chatRoomInfo.getPersonA();
        UserEntity personB = chatRoomInfo.getPersonB();
        if (personA.getUserId().equals(userId)) return personB;
        else return personA;
    }

    @Override
    public String createChatRoom(HttpServletRequest request, String userNickname) {
        UserEntity loginUser = getUserEntity(request);
        Optional<UserEntity> toUser = userRepository.findByUserNickname(userNickname);
        if(toUser.isEmpty()) throw new NoSuchElementException();

        String roomId;
        Optional<ChatInfoEntity> chatInfoEntity = chatInfoRepository.findByPersonAOrPersonB(loginUser, toUser.get());
        if(chatInfoEntity.isPresent()){ // 이미 있는 채팅, 채팅 방 번호 전달
            roomId = String.valueOf(chatInfoEntity.get().getIdx());
        }else{ // DB에 방 정보 새로 생성
            ChatInfoEntity chatInfo = new ChatInfoEntity(loginUser, toUser.get());
            chatInfoRepository.save(chatInfo);
            roomId = String.valueOf(chatInfo.getIdx());
        }
        return roomId;
    }

    @Override
    public void saveMessageRedis(ChatDto chatDto) {
        Optional<UserEntity> sendUser = userRepository.findByUserNickname(chatDto.getSendUserNickname());
        Optional<UserEntity> toUser = userRepository.findByUserNickname(chatDto.getToUserNickname());
        if(sendUser.isEmpty() || toUser.isEmpty()) return;
        String msg = chatDto.getMsg();
        Integer roomId = chatDto.getRoomId();
        Boolean isRead = chatDto.getIsRead();

        ChatEntity chat = ChatEntity.builder()
                .roomId(String.valueOf(roomId)).msg(msg).sendUserId(sendUser.get().getUserId()).
                toUserId(toUser.get().getUserId()).isRead(isRead).time(LocalDateTime.now(ZoneId.of("Asia/Seoul"))).build();
        redisTemplate.opsForList().leftPush(String.valueOf(roomId),chat);
    }

    public UserEntity getUserEntity(HttpServletRequest request){
        String userId = kakaoService.decodeToken(request.getHeader("accessToken"));
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);

        if(userEntity.isPresent())  return userEntity.get();
        else return null;
    }
}
