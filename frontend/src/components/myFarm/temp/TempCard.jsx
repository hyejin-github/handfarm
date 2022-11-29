import React, { useState, useEffect } from "react";
import TempDetail from "./TempDetail";
import { Card, Typography, Container, Box } from "@mui/material";
import TempLineGraph from "./TempLineGraph";
import TempBarGraph from "./TempBarGraph"
import TempDayGraph from "./TempDayGraph"

const TempCard = ({ temp, deviceId, value }) => {
  const sensorName = 'temp' 

  return (
    <>
      {temp !== null && value === 'temp' ? (
        <>
          {/* bar 차트 */}
          <Container>
            <Card sx={{ backgroundColor: "#1E1E1E", mt:2 }}>
              <Box sx={{ mt:2 }} display="flex" alignItems="center">
                <Typography
                  sx={{ ml:1 }}
                  variant="h6"
                  fontWeight="bold"
                  color="white"
                >
                  현재 온도
                </Typography>
              </Box>
              <TempBarGraph deviceId={deviceId} />
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
              <TempLineGraph deviceId={deviceId} />
            </Card>
            {/* 센서 시간/주간 그래프 */}
            <TempDayGraph deviceId={deviceId} sensorName={sensorName} />

            {/* 센서 설정 */}
            <TempDetail temp={temp} deviceId={deviceId} />

          </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default TempCard;
