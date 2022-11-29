import React, { useState, useEffect } from "react";
import { Typography, Box, Card } from "@mui/material";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { Line, XAxis, YAxis, Legend, LineChart } from "recharts";

const Pm2p5LineGraph = ({ deviceId }) => {
  const [sensor, setSensor] = useRecoilState(deviceSensor);
  const [timer, setTimer] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    const datas = sensor[deviceId];

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${hours}:${minutes}`);

    setData((currentData) => [
      ...currentData,
      {
        name: "Pm2p5",
        pm2p5: datas.pm2p5,
        time: timer,
      },
    ]);
  }, [sensor]);

  return (
    <>
      <Card sx={{ mt: 2, backgroundColor: "#1E1E1E" }}>
        <Box sx={{ ml: 1, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="white">
            실시간 그래프
          </Typography>
          
          <LineChart
            width={350}
            height={300}
            data={data}
            margin={{ left: 0, top: 20, right: 15 }}
          >
            <XAxis dataKey="time" />
            <YAxis />
            <Legend verticalAlign="top" align="right" />
            <Line
              type="monotone"
              dataKey="pm2p5"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </Box>
      </Card>
    </>
  );
};

export default Pm2p5LineGraph;
