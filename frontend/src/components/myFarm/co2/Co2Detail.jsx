import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  Slider,
  Button,
  InputAdornment,
  OutlinedInput,
  CardContent,
} from "@mui/material";
import { sensorManual, sensorAuto, sensorSetting } from "../../../pages/api/MyFarm";
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../atom';

const Co2Detail = ({ co2, deviceId }) => {
  const [co2Setting, setCo2Setting] = useState(0);
  const controlName = "fan"

  const [user, setUser] = useRecoilState(userInfo)
  const nickName = user.userNickname

  // 사용자 센서 설정 값 가져오기
  useEffect(() => {
    const data = sensorSetting({nickName})
      .then(res => {
        setCo2Setting(res.data[deviceId].fan)
      })
  }, [])

  // 슬라이더 최저 온도 설정
  const co2Slider = (event, newValue) => {
    if (typeof newValue === "number") {
      setCo2Setting(newValue);
    }
  };

  const initAuto = () => {
    const data = sensorAuto({ deviceId, controlName })
      .then(res => {
        setCo2Setting(res.data.controlValue)
      })
  }

  return (
    <>
      <Card sx={{ mt: 2, mb:10, backgroundColor: "#1E1E1E" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              flexGrow={1}
              fontWeight="bold"
              color="white"
            >
              센서설정
            </Typography>
            <Typography color="#FFCD29"
            onClick={initAuto}>초기화</Typography>
          </Box>
          <hr />
          <Box sx={{ mt: 1 }}>
            <Typography color="#FFA629" variant="subtitle2">
              * 이산화탄소를 설정하면 현재 이산화탄소가 설정한 범위를 벗어날 경우 Fan이 작동합니다.
            </Typography>
            <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
              * 이산화탄소 설정 범위는 0ppm ~ 6000ppm 까지입니다.
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" color="white">
              이산화탄소 농도 설정
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={co2Setting}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={0}
                max={6000}
                onChange={co2Slider}
              />

              <OutlinedInput
                value={0 < co2Setting < 6000 ? co2Setting : 2000}
                type="number"
                id="outlined-start-adornment"
                size="small"
                endAdornment={
                  <InputAdornment fontWeight="bold">ppm</InputAdornment>
                }
                sx={{ background: "white", width: "17ch", fontWeight: "bold" }}
                onChange={(e) => setCo2Setting(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{ width: 80, height: 50, background: "#424B5A" }}
              onClick={() => sensorManual({ deviceId, co2Setting, controlName })}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  등록
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Co2Detail;
