import React, {useState} from 'react';
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useEffect} from "react";
import { fetchMyChattingRooms } from '../api/Chatting';
import Avatar from '@mui/material/Avatar';
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {chatAnother} from "../../atom";
import { useRecoilState, userRecoilState } from 'recoil';


export const ChatList = () => {
    const navigator = useNavigate()
    const token = localStorage.getItem('access_token'); // 엑세스 토큰 정보
    const [chatList, setChatList] = useState([]); // 채팅 리스트 저장
    const [nowAnotherUser, setNowAnotherUser] = useRecoilState(chatAnother)
    const detailDate = (a) => {
        const milliSeconds = new Date() - a;
        const seconds = milliSeconds / 1000;
        if (seconds < 60) return `방금 전`;
        const minutes = seconds / 60;
        if (minutes < 60) return `${Math.floor(minutes)}분 전`;
        const hours = minutes / 60;
        if (hours < 24) return `${Math.floor(hours)}시간 전`;
        const days = hours / 24;
        if (days < 7) return `${Math.floor(days)}일 전`;
        const weeks = days / 7;
        if (weeks < 5) return `${Math.floor(weeks)}주 전`;
        const months = days / 30;
        if (months < 12) return `${Math.floor(months)}개월 전`;
        const years = days / 365;
        return `${Math.floor(years)}년 전`;
    };

    useEffect(() => {
         fetchMyChattingRooms()
        .then((res) => res.json().then((res) => {
            // console.log(res)
            // setChatList(res.chatList.reverse())
            let chatChat = res.chatList.sort((a,b) => new Date(b.time) - new Date(a.time))
            setChatList(chatChat)
        }))
    },[])


    return(
        <>
            <Box>
                <Typography sx={{ fontWeight : "bold", mt : 2, textAlign : "center" }} variant="h4" component="h3">Farm Talk</Typography>
                <Divider sx={{ mt : 2, mb:3, backgroundColor : "#757575" }}/>
            </Box>
            <Box>
                {chatList.map((chat, index) => (
                    <Box className="myChatList" onClick={() => {
                        setNowAnotherUser(chat.anotherUserNickname)
                        navigator(`/chat/${chat.roomId}`, {
                            state : {
                                toUserNickname : chat.anotherUserNickname
                            }
                        })
                    }}>
                        <Grid container>
                            <Grid sx={{ display : "flex", justifyContent : "center", alignItems : "center" }} item xs={4}>
                                <Avatar 
                                    sx={{ width:60, height:60 }} 
                                    alt="https://img1.daumcdn.net/thumb/R300x0/?fname=https://k.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg" 
                                    src={chat.anotherUserProfileImg}
                                />
                            </Grid>

                            <Grid item xs={8} >
                                <Grid container>
                                    <Grid item xs={8}>
                                        {chat.anotherUserNickname}
                                    </Grid>
                                    <Grid item xs={4} sx={{ color : "#B3B3B3" }}>
                                        {detailDate(new Date(chat.time))}
                                    </Grid>
                                </Grid>
                                    <Grid container>
                                        <Grid item xs={10}>
                                            <p style={{ fontWeight : "normal", textAlign : "left", lineHeight : "25px", color : "#e0e0e0", margin : "0px" , marginTop : "20px", textOverflow : "ellipsis", overflow : "hidden", whiteSpace : "nowrap" }}>
                                                {chat.content}
                                            </p>
                                        </Grid>
                                        <Grid item xs={2}>
                                            { chat.notReadCount !== 0 ? (
                                                <div style={{
                                                    width : "30px",
                                                    height : "30px",
                                                    borderRadius : "50%",
                                                    fontWeight : "bold",
                                                    textAlign : "center",
                                                    lineHeight : "30px",
                                                    color : "#e0e0e0",
                                                    margin : "0px" ,
                                                    backgroundColor : "#d32f2f",
                                                    marginTop : "20px",
                                                    textOverflow : "ellipsis",
                                                    overflow : "hidden",
                                                    whiteSpace : "nowrap",
                                                    fontFamily : "ScoreDream"
                                                }}>
                                                    { chat.notReadCount }
                                                </div>
                                            ) : (
                                                <></>
                                            ) }
                                        </Grid>
                                    </Grid>

                            </Grid>
                        </Grid>
                        <Divider sx={{ mt :3, mb:3 , backgroundColor : "#757575" }}/>
                    </Box>
                ))}
            </Box>
        </>
    )
};

export default ChatList;