import React from 'react'
import { Container, Card, Box, Typography } from '@mui/material'
import CdsBarGraph from './CdsBarGraph'
import CdsLineGraph from './CdsLineGraph'

const CdsCard = ({deviceId}) => {
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
              현재 조도
            </Typography>
          </Box>
          <CdsBarGraph deviceId={deviceId}/>
        </Card>
        <CdsLineGraph deviceId={deviceId}/>
      </Container>
    </>
  )
}

export default CdsCard;