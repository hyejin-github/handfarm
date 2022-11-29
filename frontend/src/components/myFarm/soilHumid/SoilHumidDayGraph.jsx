import React, { useState, useEffect } from "react";
import '../Graph.css'
import { sensorHours, sensorDay } from "../../../pages/api/MyFarm";
import { Typography, Box, Card } from "@mui/material";
import { Line, XAxis, YAxis, Legend, LineChart, Tooltip, CartesianGrid } from "recharts";

const SoilHumidDayGraph = ({ deviceId, sensorName }) => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState('Hours')

  useEffect(() => {
    sensorHours({ deviceId, sensorName }).then((res) => {
      setData(res.data.sensorLogList);
    });
  }, [])

  // 시간 별 그래프
  const hourSoilHumid = () => {
    setTime('Hours')
    sensorHours({ deviceId, sensorName }).then((res) => {
      setData(res.data.sensorLogList);
    });
  };

  // 주간 별 그래프
  const daySoilHumid = () => {
    setTime('Week')
    sensorDay({ deviceId, sensorName }).then((res) => {
      setData(res.data.sensorLogList);
    });
  };

  return (
    <>
      <Card sx={{ mt: 2, backgroundColor: "#1E1E1E" }}>
        <Box display="flex" alignItems="center" sx={{ ml: 1, mt: 2 }}>
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight="bold" color="white">
              시간/주간 그래프
            </Typography>
          </Box>
          <Typography onClick={hourSoilHumid}
            sx={{ mr: 2, fontWeight: 'bold' }}
            className={time === 'Hours' ? 'on-selected' : 'off-selected'}
          >
            시간별
          </Typography>
          <Typography onClick={daySoilHumid}
            sx={{ mr: 2, fontWeight: 'bold' }}
            className={time === 'Week' ? 'on-selected' : 'off-selected'}
          >
            주간별
          </Typography>
        </Box>
        <LineChart
          width={350}
          height={320}
          data={data}
          margin={{ top: 20, right: 15 }}
        >
          { time === 'Hours'? 
          <XAxis dataKey="logTime" height={40} padding={{ right: 20 }} /> 
          : <XAxis dataKey="logDate" height={40} padding={{ right: 20 }} /> }
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Line
            type="monotone"
            dataKey="avgValue"
            name={time}
            stroke="#2160CA"
            strokeWidth={2}
          />
        </LineChart>
      </Card>
    </>
  );
};

export default SoilHumidDayGraph;