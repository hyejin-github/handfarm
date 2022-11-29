import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  Button,
  InputAdornment,
  OutlinedInput,
  CardContent,
} from "@mui/material";
import { sensorManual, sensorSetting, sensorAuto } from "../../../pages/api/MyFarm";
import { useRecoilState } from "recoil";
import { userInfo } from "../../../atom";

const LedDetail = ({ deviceId }) => {
  const controlName = "led";

  const [user, setUser] = useRecoilState(userInfo);
  const nickName = user.userNickname;

  const [startLed, setStartLed] = useState(0);
  const [endLed, setEndLed] = useState(0);

  useEffect(() => {
    const data = sensorSetting({ nickName }).then((res) => {
      setStartLed(res.data[deviceId].led.split(",")[0].split("[")[1]);
      setEndLed(res.data[deviceId].led.split(",")[1].split("]")[0]);
    });
  }, []);

  // 초기화 센서 값 가져오기
  const initAuto = () => {
    const data = sensorAuto({ deviceId, controlName })
      .then((res) => {
        setStartLed(res.data.controlValue.split(",")[0].split("[")[1]);
        setEndLed(res.data.controlValue.split(",")[1].split("]")[0]);
      });
  };

  return (
    <>
      <Card sx={{ mt: 2, backgroundColor: "#1E1E1E" }}>
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
              *시간을 설정하면 설정한 범위동안 LED가 작동합니다.
            </Typography>
            <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
              * 설정 범위는 01시 ~ 24시 까지입니다.
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h7" color="white">
              시간 설정
            </Typography>
            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
              <OutlinedInput
                value={startLed > 24 || startLed < 0 ? 1 : startLed}
                type="number"
                id="outlined-start-adornment"
                size="large"
                endAdornment={
                  <InputAdornment fontWeight="bold">시</InputAdornment>
                }
                sx={{ background: "white", width: "8ch", fontWeight: "bold" }}
                onChange={(e) => setStartLed(e.target.value)}
              />
              <span style={{ fontSize: "20px", margin: "5px", color: "white" }}>
                {" "}
                ~{" "}
              </span>

              <OutlinedInput
                value={endLed > 24 || endLed < 0 ? 24 : endLed}
                type="number"
                id="outlined-start-adornment"
                size="large"
                endAdornment={
                  <InputAdornment fontWeight="bold">시</InputAdornment>
                }
                sx={{ background: "white", width: "8ch", fontWeight: "bold" }}
                onChange={(e) => setEndLed(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{ width: 80, height: 60, background: "#424B5A" }}
              onClick={() =>
                sensorManual({ deviceId, startLed, endLed, controlName })
              }
            >
              <h3>등록</h3>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default LedDetail;
