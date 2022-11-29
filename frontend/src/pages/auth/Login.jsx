import React, { useEffect } from "react";
import { KAKAO_AUTH_URL } from "./OAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export const Login = () => {
  const navigate = useNavigate()
  const LoggedIn = localStorage.getItem("access_token");

  useEffect(() => {
    if (LoggedIn) {
      navigate('/myfarm/registing')
    }
  })

  return (
    <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column", m : 4 }}>
      <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
        <img
          src="handFarmNew.png"
          alt="핸드팜"
          style={{ width: "40vh", height: "50vh", paddingTop: "100px" }}
        />
      </Box>
      <div className="Main-word">
        <h3 style={{ color: "#F24822" }}>원격으로 농장 관리와,</h3>
        <h3 style={{ color: "#0D99FF" }}>커뮤니티 기능으로,</h3>
        <h3 style={{ color: "#9747FF" }}>
          나의 농장
          <span style={{ color: "white" }}>을 관리해보세요!</span>
        </h3>
      </div>

      <Button display="flex" justifyContent="center">
        <a href={KAKAO_AUTH_URL}>
          <img src="kakaoButton.png" alt="로그인" />
        </a>
      </Button>
    </Box>
  );
};

export default Login;
