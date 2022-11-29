import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from '../../../atom';
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

const SoilHumidDetail = ({ humid, deviceId }) => {
  const controlName = "pump"

  const [user, setUser] = useRecoilState(userInfo)
  const nickName = user.userNickname

  const [soilHumidSetting, setSoilHumidSetting] = useState(50);

  useEffect(() => {
    const data = sensorSetting({nickName})
      .then(res => {
        setSoilHumidSetting(res.data[deviceId].pump)
      })
  }, [])

  const soilHumidSlider = (event, newValue) => {
    if (typeof newValue === "number") {
      setSoilHumidSetting(newValue);
    }
  };

  // 초기화 센서 값 가져오기
  const initAuto = () => {
    const data = sensorAuto({ deviceId, controlName })
      .then(res => {
        setSoilHumidSetting(res.data.controlValue)
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
              * 토양 습도를 설정하면 현재 토양 습도가 설정한 범위를 벗어날 경우 Pump가 작동합니다.
            </Typography>
            <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
              * 토양 습도 설정 범위는 0% ~ 100% 까지입니다.
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" color="white">
              토양 습도 설정
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={soilHumidSetting}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={0}
                max={100}
                onChange={soilHumidSlider}
              />
              <OutlinedInput
                value={soilHumidSetting > 100 || soilHumidSetting < 0 ? 100 : soilHumidSetting}
                type="number"
                id="outlined-start-adornment"
                size="small"
                endAdornment={
                  <InputAdornment fontWeight="bold">%</InputAdornment>
                }
                sx={{ background: "white", width: "12ch", fontWeight: "bold" }}
                onChange={(e) => setSoilHumidSetting(e.target.value)}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{ width: 80, height: 50, background: "#424B5A" }}
              onClick={() => sensorManual({ deviceId, soilHumidSetting, controlName })}
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

export default SoilHumidDetail;
