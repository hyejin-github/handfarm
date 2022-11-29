import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Container,
  Box
} from "@mui/material";
import { useRecoilState } from "recoil";
import { motorControl } from "../../../atom";
import Co2BarGraph from "./Co2BarGraph"
import Co2LineGraph from "./Co2LineGraph"
import Co2Detail from "./Co2Detail"
import Co2DayGraph from "./Co2DayGraph";

const Co2Card = ({ co2, deviceId, value }) => {
  const sensorName = 'co2'

  return (
    <>
      {co2 !== null && value === 'co2' ? (
        <>
          <Container>
            <Card sx={{ background: "#1E1E1E", mt: 2 }}>
              <Box sx={{ mt:2 }} display="flex" alignItems="center">
                <Typography
                  sx={{ ml: 1 }}
                  variant="h6"
                  fontWeight="bold"
                  color="white"
                >
                  현재 이산화탄소 농도
                </Typography>
              </Box>
              <Co2BarGraph deviceId={deviceId}/>
            </Card>
          </Container>

          <Container>
            <Card sx={{ mt:2, backgroundColor: "#1E1E1E" }}>
              <Box sx={{ ml:1, mt:2 }}>
                <Typography variant="h6" fontWeight="bold" color="white">
                  실시간 그래프
                </Typography>
              </Box>
              <Co2LineGraph deviceId={deviceId} />
            </Card>

            {/* 센서 시간/주간 그래프 */}
            <Co2DayGraph deviceId={deviceId} sensorName={sensorName} />

            {/* 센서 설정 */}
            <Co2Detail co2={co2} deviceId={deviceId} value={value} />

          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Co2Card;
