import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { motorControl } from "../../../atom";
import HumidLineGraph from "./HumidLineGraph";
import HumidBarGraph from "./HumidBarGraph"
import HumidDayGraph from "./HumidDayGraph";

const HumidCard = ({ humid, deviceId, value }) => {
  const [motorState, setMotorState] = useRecoilState(motorControl);
  const sensorName = 'humid'

  return (
    <>
      {humid !== null && value === 'humid' ? (
        <>
          <Container>
            <Card sx={{ backgroundColor: "#1E1E1E", mt: 2 }}>
              <Box sx={{ mt:2 }} display="flex" alignItems="center">
                <Typography
                  sx={{ ml:1 }}
                  variant="h6"
                  fontWeight="bold"
                  color="white"
                >
                  현재 습도
                </Typography>
              </Box>
              <HumidBarGraph deviceId={deviceId} />
            </Card>
          </Container>

          {/* 실시간 그래프 */}
          <Container>
            <Card sx={{ mt:2, backgroundColor:"#1E1E1E" }}>
              <Box sx={{ ml:1, mt:2 }}>
                <Typography variant="h6" fontWeight="bold" color="white">
                  실시간 그래프
                </Typography>
              </Box>
              <HumidLineGraph deviceId={deviceId} sensorName={sensorName} />
            </Card>
            <HumidDayGraph deviceId={deviceId} sensorName={sensorName} />
          </Container>

          {/* 시간/일 별 그래프 */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default HumidCard;
