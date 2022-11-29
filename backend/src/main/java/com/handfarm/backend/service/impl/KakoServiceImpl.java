package com.handfarm.backend.service.impl;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.handfarm.backend.domain.entity.DeviceEntity;
import com.handfarm.backend.domain.entity.UserDeviceEntity;
import com.handfarm.backend.domain.entity.UserEntity;
import com.handfarm.backend.repository.DeviceRepository;
import com.handfarm.backend.repository.UserDeviceRepository;
import com.handfarm.backend.repository.UserRepository;
import com.handfarm.backend.service.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
public class KakoServiceImpl implements KakaoService {
    private final UserRepository userRepository;
    private final UserDeviceRepository userDeviceRepository;

    private final DeviceRepository deviceRepository;

    private final String cliend_id = "115759604dfe8a9071598cf92c78fc6d";

    @Autowired
    KakoServiceImpl(UserRepository userRepository, UserDeviceRepository userDeviceRepository, DeviceRepository deviceRepository){
        this.userRepository = userRepository;
        this.userDeviceRepository = userDeviceRepository;
        this.deviceRepository = deviceRepository;
    }

    public Map<String, Object> getKakaoAccessToken (String code) throws IOException{                // 로그인 시도 서비스
        Map<String, Object> resultMap = new HashMap<>();
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id="+cliend_id); // TODO REST_API_KEY 입력
            sb.append("&redirect_uri=https://handfarm.co.kr/kakao"); // TODO 인가코드 받은 redirect_uri 입력
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            //결과 코드가 200이라면 성공

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
            resultMap.put("accessToken", access_Token);
            resultMap.put("refreshToken", refresh_Token);

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return resultMap;
    }

    public Map<String,Object> createKakaoUser(String accessToken) {                 // 회원가입 및 값 리턴
        Map<String, Object> resultMap = new HashMap<>();
        String nickname = "k";
        //access_token을 이용하여 사용자 정보 조회

        try{
            JsonElement element = GetUserInfo(accessToken);
            String id = element.getAsJsonObject().get("id").getAsString();
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            String email = "";
            if(hasEmail){
                email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            }

            nickname += id; // DB에 저장할 임시 닉네임

            // DB조회해서 기존 회원인지 찾기
            Optional<UserEntity> userEntityOptional = userRepository.findByUserId(email);
            resultMap.put("deviceInfo", null);
            // 존재하지 않으면 -> 회원가입
            if(!userEntityOptional.isPresent()){
                UserEntity userEntity = UserEntity.builder()
                        .userId(email)
                        .userNickname(nickname)
                        .build();
                userRepository.save(userEntity);
                resultMap.put("isRegisted", false);
            }else{ // 회원인 상태 -> 바로 로그인
                resultMap.put("isRegisted", true);
                nickname = userEntityOptional.get().getUserNickname();
                if(userEntityOptional.get().getDevice() != null){
                    List<Map<String , Object>> deviceList = new ArrayList<>();
                    Optional<UserEntity> userEntity = userRepository.findByUserId(email);
                    if(userEntity.isEmpty()) throw new NoSuchElementException();
                    List<UserDeviceEntity> userDeviceEntityList = userDeviceRepository.findByUserIdx(userEntity.get());

                    if(!userDeviceEntityList.isEmpty()) {
                        for (UserDeviceEntity userDeviceEntity : userDeviceEntityList) {
                            Optional<DeviceEntity> device = deviceRepository.findById(userDeviceEntity.getDeviceIdx().getIdx());
                            if(device.isEmpty()) throw new NoSuchElementException();
                            String Crop = device.get().getCrop().getCropName();
                            Map<String, Object> deviceMap = new HashMap<>();
                            Map<String ,Object> deviceAll = new HashMap<>();
                            deviceMap.put("deviceName", device.get().getDeviceName());
                            deviceMap.put("cropName", Crop);
                            deviceMap.put("deviceLatitude", device.get().getDeviceLatitude());
                            deviceMap.put("deviceLong", device.get().getDeviceLong());
                            deviceMap.put("deviceCamera", device.get().getDeviceCamera());
                            deviceAll.put(device.get().getDeviceNo(), deviceMap);
                            deviceList.add(deviceAll);
                        }
                        resultMap.put("deviceInfo", deviceList);
                    }
                }
            }
            resultMap.put("userId", email);
            resultMap.put("userNickname", nickname);

        }catch (IOException e){
            e.printStackTrace();
            resultMap.put("error" , "timeOut");
        }
        return resultMap;
    }

    @Override
    public String decodeToken(String accessToken)  { // 엑세스토큰으로 닉네임 찾기
        String decodeId = "";
        try{
            JsonElement element = (JsonElement)GetUserInfo(accessToken);
            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
            if(hasEmail){
                decodeId = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
            }
            return decodeId;
        } catch (IOException e) {
            e.printStackTrace();
            return "timeOut";
        }
    }


    @Override
    public JsonElement GetUserInfo(String accessToken) throws IOException { // 사용자 정보 가져오기
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            br.close();

            return element;
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    @Override
    public String CheckRefreshToken(String refreshToken)  {              // 리프레시 토큰 체크
        String access_Token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=refresh_token");
            sb.append("&client_id="+cliend_id);
            sb.append("&refresh_token=" + refreshToken);
            bw.write(sb.toString());
            bw.flush();

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();


            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
            return "timeOut";
        }
        return access_Token;
    }

    @Override
    public String KakaoLogout(String accessToken) throws IOException {
            String reqURL = "https://kapi.kakao.com/v1/user/logout";

            try {
                URL url = new URL(reqURL);
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();

                //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                conn.setRequestProperty("Authorization", "Bearer " + accessToken);

                //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String line = "";
                String result = "";

                while ((line = br.readLine()) != null) {
                    result += line;
                }

                br.close();
            } catch (IOException e) {
                e.printStackTrace();
                return "timeOut";
            }
        return "Logout Sucess";

    }
    @Override
    public Boolean CheckAccessToken(String accessToken) throws IOException {
        String reqURL = "https://kapi.kakao.com/v1/user/access_token_info";


            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            br.close();
        return true;

    }
    @Override
    public Boolean KakaoUnlink(String accessToken) throws IOException {
        String reqURL = "https://kapi.kakao.com/v1/user/unlink";
//
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + accessToken);

             //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            br.close();
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
