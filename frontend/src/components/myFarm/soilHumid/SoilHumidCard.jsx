import React from 'react'
import { Card, CardContent, Typography, CardActions, Container, Box } from '@mui/material'
import SoilHumidBarGraph from "./SoilHumidBarGraph"
import SoilHumidLineGraph from "./SoilHumidLineGraph"
import SoilHumidDetail from "./SoilHumidDetail"
import SoilHumidDayGraph from "./SoilHumidDayGraph"

const SoilHumidCard = ({ soilHumid, deviceId, value }) => {
  const sensorName = 'humidSoil'

  return (
    <>
      {soilHumid !== null && value === 'soilHumid' ?
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
                  현재 토양 습도
                </Typography>
              </Box>
              <SoilHumidBarGraph soilHumid={soilHumid} />
            </Card>
          </Container>

          <Container>
            <Card sx={{ mt:2, backgroundColor:"#1E1E1E" }}>
              <Box sx={{ ml:1, mt:2 }}>
                <Typography variant="h6" fontWeight="bold" color="white">
                  실시간 그래프
                </Typography>
              </Box>
              <SoilHumidLineGraph deviceId={deviceId} />
            </Card>

            <SoilHumidDayGraph deviceId={deviceId} sensorName={sensorName} />
            {/* 센서 설정 */}
            <SoilHumidDetail soilHumid={soilHumid} deviceId={deviceId} />

          </Container>
        </>
        : <></>}
    </>
  )
}

export default SoilHumidCard

