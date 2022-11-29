import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import {useLocation} from "react-router-dom";
import {chatAnother} from "../../atom";
import {useNavigate} from "react-router-dom";
// import instance from '../../utils/axiosConfig';
import Box from "@mui/material/Box";
import {userInfo} from "../../atom";
import {useRecoilState} from "recoil";
import {Button, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import './chatting.css'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import { fetchMyChatDetail } from '../api/Chatting';
import {useCallback} from "react";

export function CreateReadChat() {
    const location = useLocation()
    const [chat, setChat] = useState('');
    const [nowUser, setNowUser] = useRecoilState(userInfo)
    const  apply_id  = useParams()
    const client = useRef({});
    const { toUserNickname } = location.state
    const navigator = useNavigate();
    const scrollRef = useRef();
    const [chatList, setChatList] = useState([])
    const [anotherUserNick, setAnotherUserNick] = useRecoilState(chatAnother)
    const [anotherProfile, setAnotherProfile] = useState("")
    // const editDone = false
    //
    // const scrollToBottom = useCallback(() => {
    //     if (editDone) {
    //         // 스크롤 내리기
    //         scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    //     }
    // }, [editDone]);
    console.log(anotherUserNick)
    useEffect(() => {
        window.scrollTo(0,document.body.scrollHeight)
    },[chatList])

    useEffect(() => {
        fetchMyChatDetail(parseInt(apply_id.id))
            .then((res) => res.json().then((res) => {
                // console.log(res)
                setAnotherProfile(res.toUserProfileImg)
                setChatList(res.chatDetail.reverse())
            }))
    }, [])
    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: 'ws://handfarm.co.kr:8081/ws',
            onConnect: () => {
                console.log('success');
                subscribe();
            },
        });
        client.current.activate();
    };

    const publish = (chat) => {
        if (!client.current.connected) return;
        if(chat === "") return;


        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                roomId: parseInt(apply_id.id),
                msg : chat,
                toUserNickname : toUserNickname,
                sendUserNickname : nowUser.userNickname,
                isRead : false
            }),
        });

        setChat('');
    };

    const subscribe = () => {
        client.current.subscribe('/sub/chat/' + apply_id.id, (body) => {
            const json_body = JSON.parse(body.body);
            setChatList((_chat_list) => [
                ..._chat_list, json_body
            ]);
        });
    };

    const disconnect = () => {
        client.current.deactivate();
    };

    const handleChange = (event) => { // 채팅 입력 시 state에 값 설정
        setChat(event.target.value);
    };

    const handleSubmit = (event, chat) => { // 보내기 버튼 눌렀을 때 publish
        event.preventDefault();

        publish(chat);
    };

    useEffect(() => {
        connect();

        return () => disconnect();
    }, []);

    return (
        <div>
            {/*<div className={'chat-list'}>{chatList}</div>*/}
            <Box className="wrap" ref={scrollRef}>
                { chatList.map((chatting, index) => (
                     chatting.sendUserNickname === nowUser.userNickname ? (
                         <Box className="chat ch2">
                            <Box className="textbox" key={index} sx={{ color : 'black' }} >{ chatting.msg }</Box>
                             {/*{ chatting.isRead === false ? (*/}
                             {/*    <p style={{ paddingTop : "20px", paddingRight : "5px", color : "#F9EB54"  }}>*/}
                             {/*        1*/}
                             {/*    </p>*/}
                             {/*) : (*/}
                             {/*    <></>*/}
                             {/*) }*/}
                         </Box>
                     )  : (
                         <Box className="chat ch1" key={index} sx={{ display : "flex",justifyContent : "left",  color : "black"}}>
                             <Avatar alt="https://img1.daumcdn.net/thumb/R300x0/?fname=https://k.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg"
                                     src={anotherProfile}
                                     onClick={() => {
                                         navigator(`/mypage/${chatting.sendUserNickname}`)
                                     }}
                             />
                                 {/*<Box style={{ color : "white" }}>강현</Box>*/}
                                 <Box className="textbox">
                                     { chatting.msg }
                                 </Box>
                         </Box>
                     )
                )) }
            </Box>
            {/*<form onSubmit={(event) => handleSubmit(event, chat)}>*/}
            {/*    <div>*/}
            {/*        <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />*/}
            {/*    </div>*/}
            {/*    <input type={'submit'} value={'의견 보내기'} />*/}
            {/*</form>*/}
            <Grid container spacing={1} sx={{
                width : "100vw",
                position : "fixed",
                bottom : 0,
                backgroundColor : "#212528",
                marginLeft : "0px",
                border  : "1px solid #B3B3B3"
            }}>
                <Grid item xs={9}>
                    <TextField
                        type={'text'} name={'chatInput'} onChange={handleChange} value={chat}
                        fullWidth
                        sx={{
                            ' .MuiOutlinedInput-root': {
                                color: 'black',
                                border : '0px solid #B3B3B3',
                                backgroundColor : "#B3B3B3",
                                fontFamily : "ScoreDream"
                            },
                            mb : 1
                        }}
                        placeholder=""
                    />
                </Grid>
                <Grid item xs={3} sx={{ paddingLeft : "16px" }}>
                    <Button variant="contained" style={{
                        backgroundColor : "#FFA629",
                        marginTop : "9px",
                        marginLeft : "10px",
                        fontFamily : "ScoreDream"
                    }}
                            onClick={(event) => {
                                handleSubmit(event, chat)
                            }}
                    >작성</Button>
                </Grid>
            </Grid>
        </div>
    );
}