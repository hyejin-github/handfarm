import React from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import handFarmLogo from '../../pictures/cropcommunity.png'
import handFarmLogo2 from '../../pictures/farmmunity2.png'
import styled from "styled-components";
import {Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Divider from "@mui/material/Divider";

const LogoDiv = styled.div`
  background-image: url(${handFarmLogo});
  background-size: cover;
  //background-color: white;
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
  //box-shadow: 5px 5px 5px;
`

const LogoDiv2 = styled.div`
  background-image: url(${handFarmLogo2});
  background-size: cover;
  //background-color: white;
  width: 200px;
  height: 200px;
  margin: 10px;
  //background-color: white;
  //box-shadow: 5px 5px 5px;
  border-radius: 10px;
`


const FarmmunityMain = () => {
    const navigator = useNavigate();

    return (
        <Box>
            <Typography sx={{ fontWeight : "bold", mt : 2, textAlign : "center" }} variant="h4" component="h3">Farmmunity</Typography>
            {/*<Box sx={{ backgroundImage : url(${handFarmLogo}) }}></Box>*/}
            <Divider sx={{ m : 1, backgroundColor : "#757575" }}/>
            <Box sx={{ mx : 1, display : "flex", justifyContent: "center", alignItems : "center", flexDirection : "column",borderRight : "10px" }}>
                {/*<img style={{ width : "300px", height : "400px" }} alt="logo" src="handFarmNew.png"  />*/}
                <LogoDiv/>
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "10px", color : '#B3B3B3', mb: 0.5, fontFamily : "ScoreDream" }}>나만의 노하우를 공유해보세요!</Typography>
                <Button
                    onClick={() => { navigator('/community/info')}}
                    style={{ backgroundColor : "#FFA629"}}
                    sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    정보 공유
                </Button>
            </Box>
            <Divider style={{ backgroundColor : "white", marginTop : "10px", marginLeft: '10%', marginRight : '10%' }} />
            <Box sx={{ display : "flex", justifyContent : "center", alignItems : "center", flexDirection : "column" }}>
                <LogoDiv2 style={{ marginTop : "20px" }} />
                <Typography variant="h5" component="h5" sx={{ fontSize : "15px", marginTop : "20px", color : '#B3B3B3',mb: 0.5, fontFamily : "ScoreDream" }}>주변 회원과 소통해보세요!</Typography>
                <Button
                    onClick={() => { navigator('/community/region') }}
                    style={{ backgroundColor : "#FFA629"}}
                    sx={{ width : "300px", height : "50px", fontFamily : "ScoreDream", fontSize : "15px" }} variant="contained" disableElevation>
                    지역 게시판
                </Button>
            </Box>

        </Box>
    );
};

export default FarmmunityMain;