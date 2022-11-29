//package com.handfarm.backend;
//
//import com.google.gson.JsonElement;
//import com.google.gson.JsonParser;
//import com.handfarm.backend.domain.entity.UserEntity;
//import com.handfarm.backend.repository.UserRepository;
//import com.handfarm.backend.service.impl.KakoServiceImpl;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Optional;
//
//@SpringBootTest
//class BackendApplicationTests {
//	@Autowired
//	KakoServiceImpl kakoService;
//    @Autowired
//    UserRepository userRepository;
//	@Test
//		public void createKakaoUser() {
//			String token = "aHfLOaZJmVDKy9T350AIiqzSgzj13s5PqlSvrGyPCilwnwAAAYPzw1_w";
//			String reqURL = "https://kapi.kakao.com/v2/user/me";
//
//			//access_token을 이용하여 사용자 정보 조회
//			try {
//				URL url = new URL(reqURL);
//				HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//				conn.setRequestMethod("POST");
//				conn.setDoOutput(true);
//				conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송
//
//				//결과 코드가 200이라면 성공
//				int responseCode = conn.getResponseCode();
//				System.out.println("responseCode : " + responseCode);
//
//				//요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//				BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//				String line = "";
//				String result = "";
//
//				while ((line = br.readLine()) != null) {
//					result += line;
//				}
//				System.out.println("response body : " + result);
//
//				//Gson 라이브러리로 JSON파싱
//				JsonParser parser = new JsonParser();
//				JsonElement element = parser.parse(result);
//
//
//				String id = element.getAsJsonObject().get("id").getAsString();
//				boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
//				String email = "";
//				if(hasEmail){
//					email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
//				}
//
//				System.out.println("id : " + id);
//				System.out.println("email : " + email);
//
//				br.close();
//
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		@Test
//		public void 리프레시토큰_테스트(){
//			kakoService.CheckRefreshToken("dpWLqImx-eYD3Tl109Pam-qegZ364dTDxQT-rQhvCilwnwAAAYQNmNTD");
//		}
//		@Test
//		public void	엑세스토큰_테스트() throws IOException {
//			kakoService.CheckAccessToken("onnGs-4He5Lb4A1tY807DG6Fgm_h_DU9nXOrt8SyCisMpgAAAYQM0OHU");
//		}
//
//		@Test
//		public void 엑세스토큰으로_아이디찾기(){
//			String id = kakoService.decodeToken("onnGs-4He5Lb4A1tY807DG6Fgm_h_DU9nXOrt8SyCisMpgAAAYQM0OHU");
//			System.out.println(id);
//		}
//
//		@Test
//		public void 로그아웃() throws IOException {
//			kakoService.KakaoLogout("GsiDLe0yafgBrlP7B1mQo3u0HNyAFHeFFyL7n6tLCj10mAAAAYQNmanE");
//		}
//
//        @Test
//        public void  test(){
//            Optional<UserEntity> userEntity =  userRepository.findByUserId("swyou1123@naver.com");
//            System.out.println(userEntity.get().getUserDevice());
//        }
//
//}
