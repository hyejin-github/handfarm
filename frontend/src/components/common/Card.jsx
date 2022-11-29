import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from "@mui/material/Divider";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';



const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function BasicCard({ title, idx, content, likeCount, commentCount }) {
    const navigator = useNavigate()

    return (
        <Card sx={{ boxShadow: "2px 2px 6px #9E9E9E" , minWidth: 275, backgroundColor : "#696969", mt : 2,  mx : 2, height : "150px" }}
              onClick={() => {
                  navigator(`/community/${idx}`)}}
        >
            <CardContent sx={{ mb : 0 }}>
                <Typography sx={{ fontSize: 15, color : "white", fontWeight : "bold", textAlign : "left", fontFamily : "ScoreDream" }} color="text.secondary" gutterBottom>
                    { title }
                </Typography>
                <Typography dangerouslySetInnerHTML={{ __html: content }} sx={{ width : "300px",  fontFamily : "ScoreDream", color : "white", mb : 2, overflow : "hidden", textOverflow : "ellipsis", whiteSpace : "nowrap"  }} variant="body2">
                </Typography>
                <Divider sx={{ backgroundColor : "white" }}/>
            </CardContent>
            <Box sx={{ ml : 1 ,display : "flex" ,fontSize : "20px", alignItems : "center", justifyContent : "start", color : "white" }}>
                <ChatBubbleOutlineIcon/>
                <span style={{ fontSize : "15px", margin : "5px" }}>{ commentCount }</span>
                <FavoriteBorderIcon/>
                <span style={{ fontSize : "15px", margin : "5px" }}>{ likeCount }</span>
            </Box>
        </Card>
    );
}
