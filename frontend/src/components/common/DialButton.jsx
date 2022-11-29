import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CreateIcon from '@mui/icons-material/Create';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {nowCrop} from "../../atom";
import {nowRegion} from "../../atom";
import {useRecoilState} from "recoil";
import {useRecoilValue} from "recoil";

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function DialButton({ now }) {
    const navigator = useNavigate()
    let crop = useRecoilValue(nowCrop)
    let region = useRecoilValue(nowRegion)
    const [where, setWhere] = useState("")
    // console.log(now)
    // console.log(crop)
    // console.log(where)

    const whereToGo = () =>{
        if(now === "정보"){
            if(crop === ""){
                crop = "딸기"
            }else if(crop === 10){
                crop = "방울 토마토"
            }else if(crop === 20){
                crop = "파프리카"
            }
            navigator(`/community/create/${crop}`)
        }else if(now ==="지역"){
            if(region === ""){
                region = "광주"
            }else if(region === 10){
                region = "서울"
            }else if(region === 20){
                region = "대전"
            }else if(region === 30){
                region = "부산"
            }else if(region === 40){
                region = "구미"
            }
            navigator(`/community/create/${region}`)
        }
    }

    return (
        <Box sx={{ height : "100px", transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<CreateIcon />}
                onClick={() => {
                    whereToGo()
                }}
                FabProps={{
                    sx: {
                        bgcolor: '#757575',
                        '&:hover': {
                            bgcolor: '#757575',
                        }
                    }
                }}
            >
                {/*{actions.map((action) => (*/}
                {/*    <SpeedDialAction*/}
                {/*        key={action.name}*/}
                {/*        icon={action.icon}*/}
                {/*        tooltipTitle={action.name}*/}
                {/*    />*/}
            </SpeedDial>
        </Box>
    );
}
