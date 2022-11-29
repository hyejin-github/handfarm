import React, {useState} from 'react';
import './MyPage.css'
import MyPageFarm from './MyPageFarm';
import MyPageArticle from './MyPageArticle';
import MyPageSetting from './MyPageSetting';
import { useRecoilState } from 'recoil';
import {chatAnother, userInfo} from '../../atom';
import { Avatar, Typography, Container, Box, Switch } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {useEffect} from "react";
import {fetchUserInfo} from "../api/MyPage";
import BasicCard from "../../components/common/Card";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import {changeOpen} from "../api/MyPage";
import {updateUserInfo} from "../api/MyPage";
import {useParams} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {createChatRoom} from "../api/Chatting";
import {useNavigate} from "react-router-dom";
import {fetchMyFarm} from "../api/MyPage";
import {myPageUserFarm} from "../../atom";

const MyPage = () => {
    // const [loginUser, setLoginUser] = useRecoilState(userInfo)
    const [myPageLook, setMyPageLook] = useState('Farm')
    const [userArticle, setUserArticle] = useState([])
    const [userNickname, setUserNickname] = useState("")
    const [userOpen, setUserOpen] = useState(true)
    const [checked, setChecked] = useState(true)
    const [sensorValue, setSensorValue] = useState({})
    const [userProfile, setUserProfile] = useState("")
    const [deviceInfo, setDeviceInfo] = useState([])
    const [loginUser, setLoginUser] = useRecoilState(userInfo)
    // const [nowPageUserFarm, setNowPageUserFarm] = useRecoilState(myPageUserFarm)
    const location = useLocation()
    const [anotherUser, setAnotherUser] = useRecoilState(chatAnother)
    // 로그인 유저 농장
    const [nowUserFarm, setNowUserFarm] = useRecoilState(myPageUserFarm)
    let pageUser = useParams().nickname
    const navigator = useNavigate()
    console.log(pageUser)

    useEffect(() => {
        fetchUserInfo(pageUser)
            .then((res) => res.json().then((res) => {
                setUserArticle(res.articleList)
                setUserNickname(res.userNickName)
                setUserProfile(res.userProfile)
                setChecked(res.userOpen)
                setSensorValue({...res.devicesInfo[0].sensorValue})
                setDeviceInfo(res.devicesInfo[0])
                // setNowPageUserFarm(res.devicesInfo[0])
                // setUserOpen(res.userOpen)
                // console.log(res.userOpen)
                // setUserOpen(res.userOpen)
                console.log(res)
            }))
    },[pageUser])

    useEffect(() => {
        fetchUserInfo(loginUser.userNickname)
            .then((res) => res.json().then((res)=> {
                console.log(res.devicesInfo)
                setNowUserFarm(res.devicesInfo)
            }))
    }, [pageUser]);


    const goChatting = (userName) => {
        createChatRoom(userName)
            .then((res) => res.json().then((res) => {
                setAnotherUser(userName)
                navigator(`/chat/${res.roomId}`,  { state : {
                        toUserNickname : userName
                    }})
            }))
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
        // console.log(checked)
    };

    useEffect(() => {
        changeOpen(checked)
            .then((res) => res.json().then((res) => {
                // console.log(res)
            }))
    },[checked])

    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&:before, &:after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&:after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));


    
    return (
        <>
            <Container sx={{ mt: 2 }}>
                <Box>
                    <Box display="flex" alignItems="center">
                        <Box sx={{ display : "flex", alignItems : "center", fontFamily : "ScoreDream", ml : 1 }} flexGrow={1}>
                            <Avatar alt="Profile Img" src={userProfile}
                                sx={{ width: 60, height: 60 }}>
                            </Avatar>
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontFamily : "ScoreDream", fontWeight: "bold" }} variant="h6">{userNickname}</Typography>
                                <Box display="flex" alignItems='center' sx={{  color : "#B3B3B3"  }}>
                                    { pageUser !== loginUser.userNickname ? (
                                        <>
                                            <MailOutlineIcon onClick={() => {
                                                goChatting(userNickname)
                                            }} />
                                        <Typography variant="subtitle2" sx={{ fontFamily : "ScoreDream", color : "#B3B3B3", fontWeight: "bold"  }}>&nbsp;채팅 보내기</Typography>
                                        </>
                                    ) : (
                                        <></>
                                    ) }
                                </Box>
                            </Box>
                        </Box>
                        {/*<Switch color="warning"></Switch>*/}
                        { pageUser === loginUser.userNickname ? (
                            <>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography sx={{ fontFamily : "ScoreDream",fontWeight: "bold" }}>공개여부</Typography>
                                    <FormControlLabel
                                        style={{ margin : 0 }}
                                        control={<Android12Switch
                                            checked={checked}
                                            onChange={handleChange}
                                            // defaultChecked
                                        />}
                                    />
                                    {/*<Typography>공개</Typography>*/}
                                </Stack>
                                <MyPageSetting style={{ fontFamily : "ScoreDream" }} nickName={userNickname} userProfile={userProfile}/>
                            </>
                        ) : (
                            <>
                            </>
                        )}
                    </Box>
                </Box>
                <Box sx={{mt:5}} display="flex" justifyContent="space-around">
                    <Typography variant='h5' 
                    onClick={() => setMyPageLook('Farm')}
                                sx={{ fontFamily : "ScoreDream", fontWeight: "bold", fontSize : "22px" }}
                    className={myPageLook==='Farm'?('look-on'):('look-off')}>농장</Typography>
                    <Typography variant='h5'
                    onClick={() => setMyPageLook('Article')}
                                sx={{ fontFamily : "ScoreDream", fontWeight: "bold", fontSize : "22px" }}
                    className={myPageLook==='Article'?('look-on'):('look-off')}>작성한 게시글</Typography>
                </Box>
                {myPageLook==='Farm' ? (<MyPageFarm sensorValues={sensorValue} deviceInfo={deviceInfo} userOpen={checked} userNickName={pageUser} />) : (
                    <>
                        {userArticle.map((article, index) => (
                            <BasicCard
                                key={index}
                                title={article.articleTitle}
                                idx={article.idx}
                                content={article.articleContent}
                                likeCount={article.likeCount}
                                commentCount={article.commentCount}
                            />

                        ))}
                    </>
                )}
            </Container>
        </>
    );
};

export default MyPage;