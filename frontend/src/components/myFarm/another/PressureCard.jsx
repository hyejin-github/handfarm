import React from 'react'
import { Container, Card, Box, Typography } from '@mui/material'
import PressureBarGraph from './CdsBarGraph'
import PressureLineGraph from './CdsLineGraph'

const PressureCard = ({deviceId}) => {
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
              현재 기압
            </Typography>
          </Box>
          <PressureBarGraph deviceId={deviceId}/>
        </Card>
        <PressureLineGraph deviceId={deviceId}/>
      </Container>
    </>
  )
}

export default PressureCard;