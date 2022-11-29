import React from 'react'
import { Container, Card, Box, Typography } from '@mui/material'
import Pm2p5BarGraph from './Pm2p5BarGraph'
import Pm2p5LineGraph from './Pm2p5LineGraph'
import Pm2p5DayGrahph from './Pm2p5DayGraph'

const Pm2p5Card = ({deviceId}) => {
  const sensorName = 'pm2p5'

  return (
    <>
      <Container>
        <Card sx={{ backgroundColor: "#1E1E1E", mt:2 }}>
          <Box sx={{ mt:2 }} display="flex" alignItems="center">
            <Typography
              sx={{ ml:1 }}
              variant="h6"
              fontWeight="bold"
              color="white"
            >
              현재 초미세먼지
            </Typography>
          </Box>
          <Pm2p5BarGraph deviceId={deviceId}/>
        </Card>
        <Pm2p5LineGraph deviceId={deviceId}/>
        <Pm2p5DayGrahph deviceId={deviceId} sensorName={sensorName} />
      </Container>
    </>
  )
}

export default Pm2p5Card;