import React from 'react'
import { Container, Card, Box, Typography } from '@mui/material'
import Pm10BarGraph from './Pm10BarGraph'
import Pm10LineGraph from './Pm10LineGraph'
import Pm10DayGraph from './Pm10DayGraph'

const Pm10Card = ({deviceId}) => {
  const sensorName = 'pm10'

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
              현재 미세먼지
            </Typography>
          </Box>
          <Pm10BarGraph deviceId={deviceId}/>
        </Card>
        <Pm10LineGraph deviceId={deviceId}/>
        <Pm10DayGraph deviceId={deviceId} sensorName={sensorName} />
      </Container>
    </>
  )
}

export default Pm10Card;