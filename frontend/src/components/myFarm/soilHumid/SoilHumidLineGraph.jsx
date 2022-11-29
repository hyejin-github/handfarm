import React, {useState, useEffect} from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../../atom";
import { Line, XAxis, YAxis, Legend, LineChart } from "recharts";

const SoilHumidLineGraph = ({ deviceId }) => {
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
        name: "Temp",
        soilHumid: datas.humidSoil,
        time: timer,
      },
    ]);
  }, [sensor]);

  return (
    <LineChart width={350} height={300} data={data}
    margin={{left:0, top:20, right:15}}>
      <XAxis dataKey="time" />
      <YAxis />
      <Legend verticalAlign="top" align="right" />
      <Line type="monotone" dataKey="soilHumid" stroke="#8884d8" 
      dot={false} strokeWidth={2} />
    </LineChart>
  );
};

export default SoilHumidLineGraph;
