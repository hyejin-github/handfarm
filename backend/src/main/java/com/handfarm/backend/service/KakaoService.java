package com.handfarm.backend.service;

import com.google.gson.JsonElement;

import java.io.IOException;
import java.util.Map;

public interface KakaoService {
    Map<String, Object> getKakaoAccessToken(String code) throws IOException;
    Map<String,Object> createKakaoUser(String access_token);
    String decodeToken(String accessToken);

    Boolean CheckAccessToken(String accessToken) throws IOException;

    JsonElement GetUserInfo(String accessToken) throws IOException;

    String CheckRefreshToken(String refreshToken);

    String KakaoLogout(String accessToken) throws IOException;

    Boolean KakaoUnlink(String accessToken) throws IOException;
}
