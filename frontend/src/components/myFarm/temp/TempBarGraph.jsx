import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { BarChart, Bar, LabelList } from "recharts";

const TempBarGraph = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  useEffect(() => {
    const datas = sensor[deviceId]
    setData([
      {
        name: "temp",
        temp: datas.temp,
      },
      {}
    ]);
  }, [sensor]);
  
  return (
    <BarChart
      layout="vertical"
      width={358}
      height={70}
      data={data}
      margin={{
        top: 20,
        left: 10,
      }}
    >
      <Bar
        dataKey="temp"
        barSize={20}
        fill="#F7B634"
      >
        <LabelList datakey="temp" position="right" fill="white" />
      </Bar>
    </BarChart>
  );
};

export default TempBarGraph;
