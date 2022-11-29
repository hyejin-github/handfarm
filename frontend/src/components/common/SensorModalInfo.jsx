import React from 'react';
import {sensorModalState} from "../../atom";
import {useRecoilState} from "recoil";
import {Button} from "@mui/material";
import {useState} from "react";
import Box from "@mui/material/Box";
import Checkbox from '@mui/material/Checkbox';
import {myPageUserFarm} from "../../atom";
import {sensorValue} from "../../atom";
import {referSensorSetting} from "../../pages/api/MyPage";
import {userInfo} from "../../atom";
import Divider from "@mui/material/Divider";

const SensorModalInfo = () => {
    const [open, setOpen] = useRecoilState(sensorModalState)
    const handleClose = () => setOpen(false)
    const [selectedValue, setSelectedValue] = useState('a');
    const [myFarm, setMyFarm] = useRecoilState(myPageUserFarm)[0]
    const [LoginuserInfo, setLoginUserInfo] = useRecoilState(userInfo)
    const [checked, setChecked] = useState(false);
    const [transDevice, setTransDevice] = useState([])
    const [nowValue, setNowValue] = useRecoilState(sensorValue)
    console.log(nowValue)
    console.log(transDevice)
    const handleChangeChecked = (deviceName) => {
        console.log(deviceName)
        if(!checked){
            setTransDevice([...transDevice, deviceName])
        }else{
            setTransDevice(transDevice.filter(device => device !== deviceName))
        }
        setChecked(!checked);
    };
    // console.log(label)
    const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Box sx={{ display : "flex", justifyContent : "right" }}>
                <Button onClick={(e) =>{
                    e.stopPropagation()
                    handleClose()}} sx={{ fontWeight : "bold", fontFamily : "ScoreDream", pr : 0}}>
                    X
                </Button>
            </Box>
            <Box sx={{ ml : 2 }}>
                적용 범위 - {nowValue.area}
                <br/>
                적용 값 - { nowValue.area === "temp" || nowValue.area === "led" ? (
                <>
                    { nowValue.area === "temp" ? (
                        <>H : { nowValue.value.split(',')[0].split('[')[1] } ℃ ,
                            L : { nowValue.value.split(',')[1].split(']')[0] } ℃
                        </>
                    ) : (
                        <>
                            S : { nowValue.value.split(',')[0].split('[')[1] } PM ,
                            E : { nowValue.value.split(',')[1].split(']')[0] } AM
                        </>
                    )}
                </>
            ) : (
                <>
                    {nowValue.area === 'fan' ? (
                        <>
                            { nowValue.value }ppm
                        </>
                    ) : (
                        <>
                            { nowValue.value }%
                        </>
                    )}
                </>
            )}
            </Box>
            <Divider sx={{ backgroundColor : "#757575", marginLeft: '5%', marginRight: '5%', mb : 2, mt : 2 }}/>
            <Box>
                <Box sx={{ ml : 2 }} >
                    <Checkbox
                        checked={checked}
                        onChange={() => {
                            handleChangeChecked(myFarm.deviceNo)
                        }}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{ color : "#3f50b5" }}
                    />{ myFarm.deviceName }&nbsp;({ myFarm.deviceCrop })<br/>
                </Box>
            </Box>
            <Box sx={{ display : "flex", justifyContent : "right", mr: 2, mt : 5 }}>
                <Button onClick={(e) => {
                    if(transDevice.length !== 0){
                        referSensorSetting(LoginuserInfo.userNickname, transDevice[0] , nowValue.area, nowValue.value)
                            .then((res) => res.json().then((res) => {
                                console.log(res)
                            }))
                        e.stopPropagation()
                        handleClose()
                    }else{
                        alert("농장이 선택되지 않았습니다.")
                    }
                }} variant="contained" sx={{ fontFamily : "ScoreDream", fontWeight : "bold" }}
                >내 농장으로 적용</Button>
                {/*<Button sx={{ ml : 1,fontFamily : "ScoreDream", fontWeight : "bold" }} variant="outlined" color="error"*/}
                {/*        onClick={(e) =>{*/}
                {/*            e.stopPropagation()*/}
                {/*            handleClose()}}*/}
                {/*        style={{ borderColor : "white", color : "white" }}*/}
                {/*>*/}
                {/*    나가기*/}
                {/*</Button>*/}
            </Box>
        </>
    );
};

export default SensorModalInfo;
