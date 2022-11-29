import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { BarChart, Bar, LabelList } from "recharts";

const SoilHumidBarGraph = ({ soilHumid }) => {
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useRecoilState(deviceSensor);

  useEffect(() => {
    setData([
      {
        name: "soilHumid",
        soilHumid: soilHumid,
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
        dataKey="soilHumid"
        barSize={20}
        fill="#424B5A"
      >
        <LabelList datakey="soilHumid" position="right" fill="white" />
      </Bar>
    </BarChart>
  );
};

export default SoilHumidBarGraph;
