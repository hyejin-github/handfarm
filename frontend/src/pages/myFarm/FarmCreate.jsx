import { Container, Box, Divider, TextField, Button, Select, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myFarmCreate } from '../api/MyFarm';

const FarmCreate = () => {
    const crops = [
        '딸기', '파프리카', '방울 토마토'
    ]
    
    const navigate = useNavigate()
    const [deviceID, setDeviceID] = useState('')
    const [myFarmName, setMyFarmName] = useState('')
    const [myCrops, setMyCrops] = useState('')
    const [nameError, setNameError] = useState(true)
    const [deviceError, setDeviceError] = useState(true)

    // 농장 이름 유효성 검사
    const nameLength = (event) => {
        let farmName = event.target.value
        if (farmName.length < 2 || farmName.length > 8) {
            setNameError(false)
        } else {
            setNameError(true)
            setMyFarmName(farmName)
        }
    }

    // 인풋 에러 통과할 시 submit
    const errorText = () => {
        if (nameError === true && myCrops !== '') {
            console.log(myFarmCreate({deviceID, myFarmName, myCrops})
            .then(result => {
                console.log(result)
                if (result === 'success') {
                    setDeviceError(true)
                    navigate(`/myfarm/registing`)
                } else {
                    setDeviceError(false)
                }
            }))
        }
    }

    return (
        <Container>
            <Box style={{ textAlign: 'left' }}>
                <h2 style={{ marginBottom: 'auto', marginLeft: '5px', marginTop: '30px' }}>내 농장 등록하기</h2>
                <Divider style={{ backgroundColor: "white" }} />

                <Container>
                    {/* 기기 등록 유효성 검사 */}
                    <Box sx={{ mt: 5 }}>
                        <h2>기기</h2>
                        <TextField variant="outlined" fullWidth
                            sx={{
                                ' .MuiOutlinedInput-root': {
                                    color: 'black',
                                    border: '1px solid white',
                                    backgroundColor: "white"
                                }
                            }}
                            onChange={(event) => { setDeviceID(event.target.value) }} />
                            {deviceError? <></> : <Typography sx={{color:'red', mt:1}}>* 디바이스 기기를 확인해주세요.</Typography>}
                    </Box>

                    {/* 농장 이름 유효성 검사 */}
                    <Box sx={{ mt: 5 }}>
                        <h2>농장 이름</h2>
                        <TextField variant="outlined" fullWidth
                            sx={{
                                ' .MuiOutlinedInput-root': {
                                    color: 'black',
                                    border: '1px solid white',
                                    backgroundColor: "white",
                                }
                            }}
                            onChange={nameLength} />
                            {nameError===true? <></> : <Typography sx={{color:'orange', mt:1}}>* 2글자 이상 8글자 이하만 가능합니다.</Typography>}
                    </Box>

                    {/* 작물 유효성 검사 */}
                    <Box sx={{ mt: 5 }}>
                        <h2>작물</h2>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={myCrops}
                            onChange={(event) => setMyCrops(event.target.value)}
                            fullWidth
                            sx={{ background: 'white' }}
                        >
                            {crops.map((crop) => (
                                <MenuItem key={crop} value={crop}>
                                    {crop}
                                </MenuItem>
                            ))}
                        </Select>
                        {myCrops === ''? <Typography sx={{color:'orange', mt:1}}>* 키울 작물을 선택해주세요.</Typography> : <></>}
                    </Box>
                </Container>

                {/* 등록, 취소 버튼 함수*/}
                <Box style={
                    { display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                    <Button variant="contained" sx={{ width: 80, height: 60, mr: 4, background: '#424B5A' }}
                    onClick={errorText}>
                        <h3>등록</h3>
                    </Button>
                    <Button variant="contained" sx={{ width: 80, height: 60, background: '#757575' }}
                    onClick={() => {navigate(-1)}}>
                        <h3>취소</h3>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default FarmCreate;