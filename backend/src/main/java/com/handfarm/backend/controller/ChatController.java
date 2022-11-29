package com.handfarm.backend.controller;

import com.handfarm.backend.domain.dto.chat.ChatDetailDto;
import com.handfarm.backend.domain.dto.chat.ChatListViewDto;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.service.ChatService;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ChatController {
    private static final String SUCCESS = "success";
    private static final String FAIL = "error";
    private static final String TIMEOUT = "accessToken timeout";
    private static final String MESSAGE = "message";
    private static final String ACCESSTOKEN = "accessToken";
    private static final HttpStatus status200 = HttpStatus.OK;
    private static final HttpStatus status500 = HttpStatus.INTERNAL_SERVER_ERROR;
    private static final HttpStatus status401 = HttpStatus.UNAUTHORIZED;
    private HttpStatus status;
    private final KakaoService kakaoService;
    private final ChatService chatService;

    @Autowired
    ChatController(KakaoService kakaoService, ChatService chatService) {
        this.kakaoService = kakaoService;
        this.chatService = chatService;
    }

    @GetMapping("chat/count") // 읽지 않은 채팅 개수
    public ResponseEntity<Map<String,Object>> getNotReadCount(HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                resultMap.put("notReadCount", chatService.getNotReadCount(request)); // 받자마자 채팅 상세 조회로 Get 요청 해야함
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("chat/{user_nickname}") // 채팅 방 생성
    public ResponseEntity<Map<String, Object>> createChatRoom(HttpServletRequest request, @PathVariable("user_nickname") String userNickname) throws IOException {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                String roomId = chatService.createChatRoom(request, userNickname);
                resultMap.put("roomId", roomId); // 받자마자 채팅 상세 조회로 Get 요청 해야함
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/chatList") // 전체 메시지 조회
    public ResponseEntity<Map<String, Object>> viewChatList(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                List<ChatListViewDto> chatList = chatService.getChatList(request);
                resultMap.put("chatList", chatList);
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @GetMapping("/chatList/{roomId}") // 채팅 상세 조회
    public ResponseEntity<Map<String, Object>> viewChatDetail(HttpServletRequest request, @PathVariable("roomId") Integer roomId) {
        Map<String, Object> resultMap = new HashMap<>();
        if(checkToken(request, resultMap)){
            try{
                List<ChatDetailDto> chatList = chatService.getChatDetail(request, String.valueOf(roomId));
                resultMap.put("chatDetail", chatList);
                UserEntity toUser = chatService.getToUser(request, String.valueOf(roomId));
                resultMap.put("toUserNickname", toUser.getUserNickname());
                resultMap.put("toUserProfileImg", toUser.getUserProfile());
                resultMap.put(MESSAGE, SUCCESS);
                status = status200;
            }catch (Exception e){
                resultMap.put(MESSAGE, FAIL);
                status = status500;
            }
        }

        return new ResponseEntity<>(resultMap, status);
    }

    public Boolean checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        try{
            kakaoService.CheckAccessToken(request.getHeader(ACCESSTOKEN));
            return true;
        }catch (IOException e){
            e.printStackTrace();
            if(request.getHeader(ACCESSTOKEN) !=null){
                resultMap.put(MESSAGE, TIMEOUT);
            }else{
                resultMap.put(MESSAGE, "acessToken is empty");
            }
            status = status401;
            return false;
        }
    }
}
