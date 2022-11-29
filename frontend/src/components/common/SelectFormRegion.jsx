import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from "react";
import {nowRegion} from "../../atom";
import {useRecoilState} from "recoil";


export default function SelectFormRegion() {
    const [region, setRegion] = useRecoilState(nowRegion);
    // console.log(region)

    const handleChange = (event) => {
        setRegion(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120,  ' .MuiOutlinedInput-root': {
                color: 'black',
                border : '1px solid white',
                backgroundColor : "white"
            }, }}>
            <Select
                value={region}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ fontFamily : "ScoreDream", m : 1 }}
            >
                <MenuItem value="">
                    광주
                </MenuItem>
                <MenuItem value={10}>서울</MenuItem>
                <MenuItem value={20}>대전</MenuItem>
                <MenuItem value={30}>부산</MenuItem>
                <MenuItem value={40}>구미</MenuItem>
            </Select>
            {/*<FormHelperText>Without label</FormHelperText>*/}
        </FormControl>
    );
}
