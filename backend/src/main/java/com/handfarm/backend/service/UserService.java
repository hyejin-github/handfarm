package com.handfarm.backend.service;


import com.handfarm.backend.domain.dto.User.UserDto;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public interface UserService {

    String findByUserId(String decodeId);

    Map<String, Object> getUserInfo(HttpServletRequest request, String toUserNickname);

    void editUserInfo(HttpServletRequest request, UserDto userDto);

    void onoffUserInfo(HttpServletRequest request);
}
