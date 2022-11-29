import axios from "axios";
import React from "react";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo } from "../../atom";
import { Box, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { KAKAO_AUTH_LOGOUT } from "./OAuth"

const Logout = () => {
  const navigate = useNavigate();
  const [LoggedIn, setLoggedIn] = useRecoilState(userInfo);

  return (
    <Box sx={{ mt: 5 }}>
      <h2>계정 관리</h2>
      <hr />
      <Box display="flex" alignItems="center">
        <Button onClick={() => {localStorage.setItem("access_token", "")}}>
          <a href={KAKAO_AUTH_LOGOUT} style={{color:'white'}}>
            <Box display="flex" alignItems="center">
              <h2 style={{ marginRight: "10px" }}>로그아웃</h2>
              <LogoutIcon />
            </Box>
          </a>
        </Button>
      </Box>
    </Box>
  );
};

export default Logout;
