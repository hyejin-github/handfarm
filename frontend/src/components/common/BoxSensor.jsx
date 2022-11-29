import React, {useState} from 'react';
import {Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import AirIcon from '@mui/icons-material/Air';
import LightModeIcon from '@mui/icons-material/LightMode';
import OpacityIcon from '@mui/icons-material/Opacity';
import AlarmIcon from '@mui/icons-material/Alarm';
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import SensorModalInfo from "./SensorModalInfo";
import {sensorModalState} from "../../atom";
import {useRecoilState} from "recoil";
import {sensorValue} from "../../atom";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "30%",
    bgcolor: "#212528",
    border: "2px solid #000",
    boxShadow: 24,
};


const BoxSensor = ({sensor}) => {
    const [open, setOpen] = useRecoilState(sensorModalState)
    const [nowValue, setNowValue] = useRecoilState(sensorValue)
    console.log(sensor)
    const handleOpen = (area, value) => {
        setNowValue({
            area : area,
            value : value
        })
        setOpen(true);
        console.log("여기옴?")
    }
    const handleClose = () => setOpen(false);

    const logoList = {
        temp : <DeviceThermostatOutlinedIcon/>,
        led : <LightModeIcon/>,
        pump : <OpacityIcon/>,
        fan : <AirIcon/>,
        buzzer : <AlarmIcon/>
        }
    const colorList = {
        temp : "#2b97bc",
        led : "#feb04d",
        pump : "#64B6F8",
        fan : "#FFA26C",
        buzzer : "#F7B634"
    }
    const unitList = {
        temp : "℃",
        led : "lx",
        pump : "RH",
        fan : "ppm",
        buzzer : ""

    }
    // if(sensor[0] === "temp" || sensor[0] === "led"){
    //     console.log(sensor[1].split(',')[0].split('[')[1])
    //     console.log(sensor[1].split(',')[1].split(']')[0])
    // }


    return (
        <Grid item xs={4}
            onClick={() =>{
                handleOpen(sensor[0], sensor[1])
            }}
        >
            <Card sx={{ background: colorList[`${sensor[0]}`],height : "110px", boxShadow: "0 0 5px" }}>
                <Box>
                    {/*<DeviceThermostatOutlinedIcon />*/}
                    <Box sx={{ m : 0.5 }}>
                        { logoList[`${sensor[0]}`] }
                    </Box>
                    <Typography textAlign="center" variant="h5" sx={{ mt: 1, fontFamily : "ScoreDream" }}>
                        { sensor[0] === "temp" ? (
                            <span style={{ fontWeight: "bold", fontFamily : "ScoreDream", fontSize : "20px" }}><span style={{ color : "red" }}>{ sensor[1].split(',')[0].split('[')[1] }{ unitList[`${sensor[0]}`] }</span> / <span style={{ color : "blue" }}>{ sensor[1].split(',')[1].split(']')[0] }{ unitList[`${sensor[0]}`] }</span></span>
                        ) : (
                            <>
                            <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[1] }</span><span style={{ fontSize : "18px", fontWeight : "bold" }}>{ unitList[`${sensor[0]}`] }</span>
                            <br/>
                                {/*<span style={{ fontWeight: "bold", fontSize : "15px", fontFamily : "ScoreDream" }}>최저온도 : { sensor[1].split(',')[1].split(']')[0] }</span>*/}
                            </>
                        ) }
                        {/*<span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[1] }</span>*/}
                    </Typography>
                </Box>
                <CardActions sx={{ ml: 1, position : "relative", bottom : 0 }}>
                    <span style={{ fontWeight: "bold", fontFamily : "ScoreDream" }}>{ sensor[0] }</span>
                </CardActions>
            </Card>
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
                    <SensorModalInfo area={sensor[0]} value={sensor[1]}/>
                </Box>
            </Modal>
        </Grid>
    );
};

export default BoxSensor;