import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { BarChart, Bar, LabelList } from "recharts";

const Pm2p5BarGraph = ({ deviceId }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  useEffect(() => {
    const datas = sensor[deviceId]

    setData([
      {
        name: "pm2p5",
        pm2p5: datas.pm2p5,
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
        dataKey="pm2p5"
        barSize={20}
        fill="#F7B634"
      >
        <LabelList datakey="pm2p5" position="right" fill="white" />
      </Bar>
    </BarChart>
  );
};

export default Pm2p5BarGraph;