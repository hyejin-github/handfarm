import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { BarChart, Bar, LabelList } from "recharts";

const Co2BarGraph = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  useEffect(() => {
    const datas = sensor[deviceId]

    setData([
      {
        name: "co2",
        co2: datas.co2,
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
        dataKey="co2"
        barSize={20}
        fill="#9747FF"
      >
        <LabelList datakey="co2" position="right" fill="white" />
      </Bar>
    </BarChart>
  );
};

export default Co2BarGraph;
