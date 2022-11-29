import React, { useEffect } from 'react';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { userInfo } from '../../atom';
import { useNavigate } from 'react-router-dom';

export const Kakao = () => {
  const navigate = useNavigate();

  let params = new URL(document.URL).searchParams
  let code = params.get("code")

  const [user, setUser] = useRecoilState(userInfo)

  const kakakoLogin = async () => {
    const result = await axios.get(`https://handfarm.co.kr/api/kakao?code=${code}`)
    const accessToken = result.data.userInfo.accessToken
    if (accessToken) {
      localStorage.setItem('access_token', accessToken)
      setUser({
        refreshToken: result.data.userInfo.refreshToken,
        isLoggedIn: true,
        isRegisted: result.data.isRegisted,
        userNickname: result.data.userInfo.userNickname,
        deviceId: result.data.userInfo.deviceInfo,
        userEmail: result.data.userInfo.userId
      })
      navigate('/myfarm/registing')
    }
  }

  useEffect(() => {
    kakakoLogin()
  }, [])

  return (
    <div>
      <h1>잠시만 기다려주세요</h1>
    </div>
  );
};

export default Kakao;