import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deviceSensor } from "../../atom";
import { BASE_URL } from "../../config";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { Grid } from "@mui/material";

import AllSensor from "./AllSensor";
import TempCard from "./temp/TempCard";
import Co2Card from "./co2/Co2Card";
import HumidCard from "./humid/HumidCard";
import SoilHumidCard from "./soilHumid/SoilHumidCard";
import LedCard from "./led/LedCard";
import AnotherCard from "./another/AnotherCard";
import PmCard from "./pm/PmCard";

import { Box, Tabs, Tab, Container } from "@mui/material";

const SensorList = ({ deviceId, email }) => {

  // 센서 실시간 정보들
  const [sensor, setSensor] = useRecoilState(deviceSensor);
  const [temp, setTemp] = useState(null);
  const [co2, setCo2] = useState(null);
  const [humid, setHumid] = useState(null);
  const [soilHumid, setSoilHumid] = useState(null);
  const [pm2p5, setPm2p5] = useState(null);
  const [pm10, setPm10] = useState(null);
  const [light, setLight] = useState(null);
  const [altitude, setAltitude] = useState(null);
  const [pressure, setPressure] = useState(null);

  const EventSource = EventSourcePolyfill || NativeEventSource

  useEffect(() => {
    let sse;
    const axiosSse = async () => {
      try {
        sse = new EventSource(`${BASE_URL}/connect/${email}`)
        sse.addEventListener("connect", (e) => {
          const { data: receivedConnectData } = e;
          setSensor(JSON.parse(receivedConnectData));
        });

        sse.onmessage = async (event) => {
          console.log(event)
        }

        sse.onerror = async (event) => {
          if (event.error) {
            if (!event.error.message.includes('No activity')) {
              sse.close();
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    axiosSse()
    return () => sse.close();
  })

  useEffect(() => {
    if (sensor[deviceId]) {
      setTemp(sensor[deviceId].temp);
      setCo2(sensor[deviceId].co2);
      setHumid(sensor[deviceId].humid);
      setSoilHumid(sensor[deviceId].humidSoil);
      setPm2p5(sensor[deviceId].pm2p5);
      setPm10(sensor[deviceId].pm10);
      setLight(sensor[deviceId].cds);
      setAltitude(sensor[deviceId].height);
      setPressure(sensor[deviceId].pressure);
    } else {
      console.log("센서 렌더링중...");
    }
  }, [sensor]);

  const [value, setValue] = useState("all");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {sensor[deviceId] ? (
        <>
          <Container>
            <Box sx={{ background: "#757575", pt: 1, color: "white" }}>
              <Box display="flex">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="visible arrows tabs example"
                    textColor="inherit"
                  >
                    <Tab label="전체" value='all' />
                    {temp ? <Tab label="온도" value="temp" /> : null}
                    {co2 ? <Tab label="이산화탄소" value="co2" /> : null}
                    {humid ? <Tab label="습도" value="humid" /> : null}
                    {soilHumid ? <Tab label="토양습도" value="soilHumid" /> : null}
                    <Tab label="Led" value="led" />
                    {pm2p5 || pm10 ? <Tab label="미세먼지" value="pm" /> : null}
                    { light || altitude || pressure ? <Tab label="그 외" value="another" /> : null}
                  </Tabs>
              </Box>
            </Box>
          </Container>
          <Grid sx={{ mt: 1 }}>
            {sensor[deviceId] ? (
              <>
                <AllSensor
                  deviceId={deviceId}
                  value={value}
                  temp={temp}
                  co2={co2}
                  humid={humid}
                  soilHumid={soilHumid}
                  pm2p5={pm2p5}
                  pm10={pm10}
                  light={light}
                  pressure={pressure}
                  altitude={altitude}
                />
                <TempCard temp={temp} deviceId={deviceId} value={value} />
                <Co2Card co2={co2} deviceId={deviceId} value={value} />
                <HumidCard humid={humid} deviceId={deviceId} value={value} />
                <SoilHumidCard soilHumid={soilHumid} deviceId={deviceId} value={value} />
                <LedCard deviceId={deviceId} value={value} />
                <AnotherCard deviceId={deviceId} value={value}
                light={light} altitude={altitude} pressure={pressure}/>
                <PmCard deviceId={deviceId} pm2p5={pm2p5} pm10={pm10} value={value} />
              </>
            ) : (
              <></>
            )}
          </Grid>
        </>
      ) : (
        <p>센서 렌더링 중...</p>
      )}
    </>
  );
};

export default SensorList;
