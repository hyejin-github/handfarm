import React, { useEffect, useState } from "react";
import handFarmLogo from '../../pictures/handFarmLogo.png'
import styled from "styled-components";
import embarrassed from '../../pictures/embarrassed.png'
import BoxSensor from "../../components/common/BoxSensor";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions, Modal,
} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import {userInfo} from "../../atom";
import {useRecoilState} from "recoil";
import {sensorModalState} from "../../atom";
import {sensorValue} from "../../atom";
// import Blur from "react-blur";
import handFarm from '../../pictures/handFarmLogo.png'
import './MyPage.css'
import SensorModalInfo from "../../components/common/SensorModalInfo";
import Divider from "@mui/material/Divider";
import {useParams} from "react-router-dom";

const representImg = styled.div`
  background-image: url(${handFarmLogo});
  width: 300px;
  height: 375px;
  margin: 10px;
  border-radius: 10px;
`

const blurDiv = styled.div`
  filter: blur(10px);
  -webkit-filter: blur(10px);
`
const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "30%",
    bgcolor: "#212528",
    border: "1px solid #000",
    boxShadow: 24,
    borderRadius : "10px",
};

const MyPageFarm = ({sensorValues,deviceInfo, userOpen, userNickName}) => {
    const [loginUser, setLoginUser] = useRecoilState(userInfo)
    const [open, setOpen] = useRecoilState(sensorModalState)
    const [nowValue, setNowValue] = useRecoilState(sensorValue)
    let pageUser = useParams().nickname
    const handleOpen = (area, value) => {
        setNowValue({
            area : area,
            value : value
        })
        setOpen(true);
        console.log("여기옴?")
    }
    const handleClose = () => setOpen(false);
    // console.log(deviceInfo)
    // console.log(userOpen)
    console.log(sensorValues)

  return (
    <>
        { userOpen || (!userOpen && userNickName === loginUser.userNickname) ?  (
            <>
                <Box sx={{boxShadow: "0 0 5px", background: '#757575', height: 50, mt: 2 }}>
                    { deviceInfo.length !== 0 ? (
                        <>
                            <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629", fontFamily : "ScoreDream" }} position="fixed">{ deviceInfo.deviceCrop }</Typography>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>{ deviceInfo.deviceName }</Typography>
                        </>
                    ) : (
                        <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>등록된 농장이 없는 회원이에요</Typography>
                    ) }
                </Box>
              <Grid
                  container
                  sx={{
                    // backgroundColor: `#FFA26C`,
                      background : "linear-gradient(to right, #FFCC99, #FFA26C)",
                    height: "110px",
                    borderRadius : "15px",
                    mt : 2
                  }}
              >
                <Grid item xs={5.9}
                      onClick={() =>{
                          if(loginUser.userNickname === pageUser){
                              return;
                          }else{
                              handleOpen("temp", sensorValues?.temp)
                          }
                      }}
                >
                  <Box>
                    <img
                        src="/assets/sensorImg/온도.png"
                        alt="..."
                        style={{ width: "14%", margin: "5px", marginBottom : "0px" }}
                    />
                    <Box
                        sx={{ fontWeight: "bold", textAlign : "center", fontFamily : "ScoreDream" }}
                    >
                        { Object.keys(sensorValues).length === 0 && sensorValues.constructor === Object ? (
                            <>
                            </>
                        ) : (
                            <>
                                <span style={{ color : "#f44336", fontSize : "20px", fontFamily : "ScoreDream" }}>H : { sensorValues.temp.split(',')[0].split('[')[1] } <span style={{ color : "black", fontSize : "13px" }}>℃</span></span>
                            <br/>
                            <span style={{ color : "#1976d2", fontSize : "20px", fontFamily : "ScoreDream" }}>L : { sensorValues.temp.split(',')[1].split(']')[0] } <span style={{ color : "black", fontSize : "13px" }}>℃</span></span>
                            </>
                        )}
                    </Box>
                  </Box>
                </Grid>
                  <Grid xs={0.2} sx={{ display : "flex", justifyContent : "center" }}>
                      <hr style={{ marginTop: '15px', marginBottom: '15px', border : "1px solid black" }}/>
                  </Grid>
                <Grid item xs={5.9}
                      onClick={() =>{
                          if(loginUser.userNickname === pageUser){
                              return;
                          }else{
                              handleOpen("fan", sensorValues?.fan)
                          }
                      }}
                >
                  <Box>
                    <img
                        src="/assets/sensorImg/C02.png"
                        alt="..."
                        style={{ width: "14%", margin: "5px" }}
                    />
                    <Box
                        sx={{ fontWeight: "bold", textAlign : "center", fontFamily : "ScoreDream",color : "black" }}
                    >
                        <span style={{ fontSize : "30px" }}>{ sensorValues?.fan }</span><span style={{ marginLeft : "15px" ,fontSize : '15px' }}>ppm</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
                <Box sx={{ m : 1, fontSize : "10px" }}>
                    ※ H : 사용자가 설정한 최고 온도<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; L : 사용자가 설정한 최저 온도
                </Box>
              <Grid
                  container
                  sx={{
                    // backgroundColor: `#C388FF`,
                      background : "linear-gradient(to right, #ddbbdd, #C388FF)",
                    height: "110px",
                    borderRadius : "15px",
                    mt : 2
                  }}
              >
                <Grid item xs={5.9}
                      onClick={() =>{
                          if(loginUser.userNickname === pageUser){
                              return;
                          }else{
                              handleOpen("led", sensorValues?.led)
                          }
                      }}
                >
                  <Box>
                    <img
                        src="/assets/sensorImg/조도.png"
                        alt="..."
                        style={{ width: "14%", margin: "5px", marginBottom : "0px" }}
                    />
                    <Box
                        sx={{ fontWeight: "bold", textAlign : "center", fontFamily : "ScoreDream" }}
                    >
                        { Object.keys(sensorValues).length === 0 && sensorValues.constructor === Object ? (
                            <>
                            </>
                        ) : (
                            <>
                                <span style={{ color : "#f44336", fontSize : "20px", fontFamily : "ScoreDream" }}>S : { sensorValues.led.split(',')[0].split('[')[1] } <span style={{ color : "black", fontSize : "13px" }}>PM</span></span>
                                <br/>
                                <span style={{ color : "#1976d2", fontSize : "20px", fontFamily : "ScoreDream" }}>E : { sensorValues.led?.split(',')[1].split(']')[0] } <span style={{ color : "black", fontSize : "13px" }}>AM</span></span>
                            </>
                        )}
                        {/*{ sensorValues?.led } lx*/}
                    </Box>
                  </Box>
                </Grid>
                  <Grid xs={0.2} sx={{ display : "flex", justifyContent : "center" }}>
                      <hr style={{ marginTop: '15px', marginBottom: '15px', border : "1px solid black" }}/>
                  </Grid>
                <Grid item xs={5.9}
                      onClick={() =>{
                          if(loginUser.userNickname === pageUser){
                              return;
                          }else{
                              handleOpen("pump", sensorValues?.pump)
                          }
                      }}
                >
                  <Box>
                    <img
                        src="/assets/sensorImg/습도.png"
                        alt="..."
                        style={{ width: "14%", margin: "5px" }}
                    />
                    <Box
                        sx={{ fontWeight: "bold", textAlign : "center", fontFamily : "ScoreDream", color : "black" }}
                    >
                        <span style={{ fontSize : "30px" }}>{ sensorValues?.pump }</span> <span style={{ marginLeft : "10px" }}>%</span>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
                <Box sx={{ m : 1, fontSize : "10px" }}>
                    ※ S : 사용자가 설정한 LED 켜짐 시간<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp; E : 사용자가 설정한 LED 꺼짐 시간
                </Box>
                <Modal
                    open={open}
                    onClose={(e) => {
                        e.stopPropagation()
                        handleClose()
                    }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <SensorModalInfo/>
                    </Box>
                </Modal>
            <Grid container spacing={1} sx={{ mt: 1 }}>
                { deviceInfo.length !== 0 ? (
                    // <>
                    // { Object.entries(sensorValues).map((sensor, idx) => (
                    //         <BoxSensor sensor={sensor}  />
                    //     )) }
                    // </>
                    <></>
                ) : (
                    <Box style={{ paddingLeft : "25%" }} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                    <Box sx={{ mt : 6 , backgroundImage : `url(${embarrassed})`, backgroundSize : "cover", width : "200px", height : "200px" }}>
                    </Box>
                    </Box>
                    ) }
            </Grid>
            </>
        ) : (
            <Box className="blurEffect">
                <Box sx={{boxShadow: "0 0 5px", background: '#757575', height: 50, mt: 2 }}>
                    <Typography sx={{ pt: 1.7, pl: 1.5, fontWeight: "bold", color: "#FFA629", fontFamily : "ScoreDream" }} position="fixed">{ deviceInfo.deviceCrop }</Typography>
                    <Typography variant="subtitle1" sx={{ textAlign: 'center', pt: 1.5, fontWeight: "bold",fontFamily : "ScoreDream" }}>{ deviceInfo.deviceName }</Typography>
                </Box>
                <Grid container spacing={1} sx={{ mt: 1 }}>
                    { deviceInfo.length !== 0 ? (
                        <>
                            { Object.entries(sensorValues).map((sensor, idx) => (
                                <BoxSensor sensor={sensor}  />
                            )) }
                        </>
                    ) : (
                        <Box style={{ paddingLeft : "25%" }} sx={{ display : "flex", justifyContent : "center", alignItems : "center" }}>
                            <Box sx={{ mt : 6 , backgroundImage : `url(${embarrassed})`, backgroundSize : "cover", width : "200px", height : "200px" }}>
                            </Box>
                        </Box>
                    ) }
                </Grid>
            </Box>
            ) }
    </>
  )
}

export default MyPageFarm