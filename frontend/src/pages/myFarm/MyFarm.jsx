import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import SensorList from "../../components/myFarm/SensorList";
import { Container, Box, Grid, IconButton, Radio, Button } from "@mui/material";
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SettingsIcon from "@mui/icons-material/Settings";
import { useRecoilState } from "recoil";
import { userInfo, userFarm, motorControl, cameraInfo, locations, motorModal, updateModal } from "../../atom";
import { useNavigate } from "react-router-dom";
import ControlDetail from "./ControlDetail"; 
import UpdateFarm from "./UpdateFarm";

const MyFarm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userInfo);
  const [myFarm, setMyFarm] = useRecoilState(userFarm);
  const [motorState, setMotorState] = useRecoilState(motorControl);
  const [camera, setCamera] = useRecoilState(cameraInfo);
  const [location, setLocation] = useRecoilState(locations);
  const devices = myFarm.deviceInfo
  const [farmRadio, setFarmRadio] = useState("0");
  const [deviceId, setDeviceId] = useState(myFarm.deviceNo[0]);
  const email = user.userEmail;

  const [onUpdate, setOnUpdate] = useRecoilState(updateModal)
  const [onControl, setOnControl] = useRecoilState(motorModal)
  const motorInfo = async () => {
    const URL = `${BASE_URL}/farm/${deviceId}/manual`
    const result = await axios.get(URL, {
      headers: {
        accessToken : localStorage.getItem('access_token')
      }
    })
    setMotorState(result.data)
  }

  useEffect(() => {
    motorInfo()
  }, [deviceId])

  useEffect(() => {
    navigate(`/myfarm/${deviceId}`);
  }, [deviceId]);

  useEffect(() => {
    if (myFarm.deviceInfo[deviceId].deviceCamera) {
      setCamera(myFarm.deviceInfo[deviceId].deviceCamera)
    }
  }, [deviceId]);

  useEffect(() => {
    setLocation([myFarm.deviceInfo[deviceId].deviceLatitude, myFarm.deviceInfo[deviceId].deviceLong])
  }, [deviceId])

  return (
    <>
      <Container sx={{ mt: 1 }}>
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            {myFarm && myFarm.deviceNo.map((d, index) => (
                <>
                  <Radio
                    key={index}
                    checked={farmRadio === `${index}`}
                    value={index}
                    onChange={(e) => {
                      setFarmRadio(e.target.value);
                      setDeviceId(myFarm.deviceNo[index]);
                    }}
                    name="radio-buttons"
                  />
                </>
              ))}
          </Box>
          {/* 농장 등록하러가기 */}
          <Button sx={{ fontWeight:'bold' }}
          onClick={() => {navigate('/myfarm/create')}}>
            농장 등록
          </Button>
        </Box>
        <Grid
          container
          style={{
            backgroundColor: "#757575",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
         <Box sx={{ ml: 1 }} flexGrow={1}>
            <p style={{ color: "#FFA629" }}>{myFarm.deviceInfo[deviceId].cropName}</p>
          </Box>
          <Box flexGrow={1}>
            <p>{myFarm.deviceInfo[deviceId].deviceName}</p>
          </Box>
          <Box>
            <IconButton size="large"
              onClick={() => {setOnControl(true)}}>
              <SettingsRemoteIcon />
            </IconButton>
            <IconButton size="large"
            onClick={() => {setOnUpdate(true)}}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </Grid>
      </Container>
      
      {/* 제어 모달 */}
      <ControlDetail deviceId={deviceId} />
      
      {/* 농장 수정 */}
      <UpdateFarm deviceId={deviceId} />
      
      {/* 센서 리스트 */}
      {myFarm ? <SensorList deviceId={deviceId} email={email} /> : <></>}
    </>
  );
};

export default MyFarm;
