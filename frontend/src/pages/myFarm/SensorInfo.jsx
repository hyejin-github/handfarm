import React from 'react'
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { Grid, Typography } from "@mui/material"

const SensorInfo = ({deviceId}) => {
  const [sensors, setSensors] = useRecoilState(deviceSensor)
  
  const sensor = [ sensors[deviceId].temp, sensors[deviceId].humid, 
  sensors[deviceId].humidSoil, sensors[deviceId].co2, 
  sensors[deviceId].pm2p5, sensors[deviceId].pm10, sensors[deviceId].cds, 
  sensors[deviceId].height, sensors[deviceId].pressure 
  ]
  
  const sensorName = ['Temp', 'Humid', 'Soil_H', 'Co2', 'PM2p5', 'PM10', 'Cds', 'altitude', 'pressure']
  const unit = ["℃", "%", "%", "ppm", "㎍/㎥", "㎍/㎥", "lux", "m", "hpa"];

  if (sensors[deviceId]) {
    return (
      <Grid container>
          {sensor.map((s, index) => (
            <Grid item xs={6} key={index}>
                {s !== undefined? 
                  <Typography sx={{ml:1, mt:1, fontWeight:'bold', color:'#757575'}}>
                    {sensorName[index]}:{sensor[index]}{unit[index]}
                  </Typography> 
                : <></> }
            </Grid>
          ))}
      </Grid>
    )
  } else {
    console.log('없어요')
  }
}

export default SensorInfo