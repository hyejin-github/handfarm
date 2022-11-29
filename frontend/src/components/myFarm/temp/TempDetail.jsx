import React, { useState, useEffect } from 'react'
import { Typography, Box, Card, Slider, Button, InputAdornment, OutlinedInput, CardContent } from "@mui/material";
import { sensorManual, sensorAuto, sensorSetting } from '../../../pages/api/MyFarm'
import { useRecoilState } from 'recoil';
import { userInfo } from '../../../atom';

const TempDetail = ({ deviceId }) => {
  const controlName = "temp"
  
  const [user, setUser] = useRecoilState(userInfo)
  const nickName = user.userNickname

  const [highTemp, setHighTemp] = useState(0)
  const [lowTemp, setLowTemp] = useState(0)

  // 사용자 센서 설정 값 가져오기
  useEffect(() => {
    const data = sensorSetting({nickName})
      .then(res => {
        setHighTemp(res.data[deviceId].temp.split(',')[0].split('[')[1])
        setLowTemp(res.data[deviceId].temp.split(',')[1].split(']')[0])
      })
  }, [])

  // 슬라이더 최저 온도 설정
  const lowTempSlider = (event, newValue) => {
    if (typeof newValue === 'number') {
      setLowTemp(newValue)
    }
  }

  // 슬라이더 최고 온도 설정
  const highTempSlider = (event, newValue) => {
    if (typeof newValue === 'number') {
      setHighTemp(newValue)
    }
  }

  // 초기화 센서 값 가져오기
  const initAuto = () => {
    const data = sensorAuto({ deviceId, controlName })
      .then(res => {
        setHighTemp(res.data.controlValue.split(',')[0].split('[')[1])
        setLowTemp(res.data.controlValue.split(',')[1].split(']')[0])
      })
  }

  return (
    <>
      <Card sx={{ mt: 2, backgroundColor: "#1E1E1E", mb:10 }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" flexGrow={1} fontWeight='bold' color="white">센서설정</Typography>
            <Typography color="#FFCD29"
              onClick={initAuto}>초기화</Typography>
          </Box>
          <hr />
          <Box sx={{ mt: 1 }}>
            <Typography color="#FFA629" variant="subtitle2">
              * 온도를 설정하면 현재 온도가 설정한 범위를 벗어날 경우 조절합니다.
            </Typography>
            <Typography sx={{ mt: 1 }} color="#FFA629" variant="subtitle2">
              * 온도 설정 범위는 -10°C ~ 40°C 까지입니다.
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h7" color="white">최고 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">
              <Slider
                value={highTemp}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={-10}
                max={40}
                onChange={highTempSlider}
              />
              <OutlinedInput
                value={highTemp > 40 || highTemp < -10 ? 40 : highTemp}
                type='number'
                id="outlined-start-adornment"
                size='small'
                endAdornment={<InputAdornment fontWeight='bold'>°C</InputAdornment>}
                sx={{ background: 'white', width: '12ch', fontWeight: 'bold' }}
                onChange={(e) => setHighTemp(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" color="white">최저 온도 설정</Typography>
            <Box display="flex" justifyContent="space-between">

              <Slider
                value={lowTemp}
                aria-label="Default"
                valueLabelDisplay="auto"
                sx={{ mr: 2 }}
                min={-10}
                max={40}
                onChange={lowTempSlider}
              />

              <OutlinedInput
                value={lowTemp > 40 || lowTemp < -10 ? -10 : lowTemp}
                type='number'
                id="outlined-start-adornment"
                size='small'
                endAdornment={<InputAdornment fontWeight='bold'>°C</InputAdornment>}
                sx={{ background: 'white', width: '12ch', fontWeight: 'bold' }}
                onChange={(e) => setLowTemp(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={
            { display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button variant="contained"
              sx={{ width: 80, height: 50, background: '#424B5A' }}
              onClick={() => sensorManual({ deviceId, highTemp, lowTemp, controlName })}
            >
              <Typography variant="h7" sx={{ fontWeight: "bold" }}>
                  등록
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default TempDetail