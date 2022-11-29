import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState } from "recoil";
import { locations } from "../../atom";
import { getWeather } from "../../pages/api/MyFarm"
import { Card, Box, Typography, Container, CardContent, Grid } from "@mui/material"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

const TodayWeather = () => {
  const [location, setLocation] = useRecoilState(locations)
  const lat = location[0]
  const lon = location[1]

  const [weather, setWeather] = useState([])

  useEffect(() => {
    getWeather({lat, lon})
    .then(res => {
      setWeather(res.data)
    })
  }, [])

  const weatherIcon = (main) => {
    if (main === 'Clear') {
      return <WbSunnyIcon fontSize="large" sx={{color:'#FFFF65'}} />
    } else if (main === 'Clouds') {
      return <CloudIcon fontSize="large" sx={{color:'#D9D9D9'}} />
    } else if (main === 'Rain') {
      return <UmbrellaIcon fontSize="large" />
    }
  } 

  const weatherDate = (date) => {
    const splitDate = date.split('-')
    return <p>{splitDate[1]}월 {splitDate[2]}일</p>
  }

  const weatherTime = (time) => {
    const splitTime = time.split(':')
    return <p>{splitTime[0]}시</p>
  }

  return (
    <>
      <Box sx={{mt:3}}>
          <Typography variant="h5" sx={{fontWeight:'bold'}}>Weather Information</Typography>
          <Grid container spacing={0.3} textAlign="center" sx={{mt:1}}>
              {weather.list && weather.list.map((w, index) => (
                <Grid item xs={4}>
                <Card key={index} sx={{background:'#2E3138'}}>
                  {index < 6?
                    <>
                      <p style={{color:'#757575', marginTop:'5px'}}>{weatherDate(w.dt_txt.split(' ')[0])}</p>
                      {weatherIcon(w.weather[0].main)}
                      <p style={{fontSize:'2.2vh', color:'white'}}>
                        {Math.round(((w.main.temp - 273.15)*10)) / 10}°
                      </p>
                      <p style={{color:'#757575', marginBottom:'5px'}}>{weatherTime(w.dt_txt.split(' ')[1])}</p>
                    </>  
                  : <></>}
                </Card>
              </Grid>
              ))}
          </Grid>
      </Box>
    </>
  )
}

export default TodayWeather;