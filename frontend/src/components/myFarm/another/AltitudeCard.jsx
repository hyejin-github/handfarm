import React from 'react'
import { Container, Card, Box, Typography } from '@mui/material'
import AltitudeBarGraph from './AltitudeBarGraph'
import AltitudeLineGraph from './AlltitudeLineGraph'

const AltitudeCard = ({deviceId}) => {
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
              현재 고도
            </Typography>
          </Box>
          <AltitudeBarGraph deviceId={deviceId}/>
        </Card>
        <AltitudeLineGraph deviceId={deviceId}/>
      </Container>
    </>
  )
}

export default AltitudeCard;