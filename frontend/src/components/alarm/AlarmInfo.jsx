import "./Alarm.css";
import React, { useEffect, useState } from "react";
import {fetchAlarm, AlarmRead, AlarmDelete } from "../../pages/api/Alarm";
import { Typography, Card, Box, Button, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {alarmState} from "../../atom"

const CardContentNoPadding = styled(CardContent)(`
  padding: 16;
  &:last-child {
    padding-bottom: 0;
  }
`);

const AlarmInfo = () => {
  const navigator = useNavigate()
  const [open, setOpen] = useRecoilState(alarmState)
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    async function AlarmList() {
      const data = await fetchAlarm();
      setAlarms(data);
    }
    AlarmList();
  }, []);

  const changeWord = (type) => {
    if (type === "comment") {
      return <span>댓글</span>;
    } else if (type === "reply") {
      return <span>답글</span>;
    } else if (type === "like") {
      return <span>좋아요</span>;
    }
  };

  const goArticle = (articleIdx) => {
    setOpen(false)
    navigator(`/communuty/${articleIdx}`)
  }

  return (
    <>
      <div>{alarms.length === 0 ? 
        (<Box>
          <CardContent>도착한 알람이 없습니다.</CardContent>
        </Box>) : alarms.map(alarm => (
          <div key={alarm.idx}>
          <Card sx={{ m: 2 }}>
            <Box sx={{ background: "#FFD900", p: 1 }} textAlign="center">
              <span>알림 도착!</span>
            </Box>
            <CardContentNoPadding>
              {alarm.isRead === true ? <span>(읽음) </span> : <></>}
              <Typography variant="h7" sx={{ mt: 1, color: "black" }}>
                {alarm.fromUserNickname}님이 {alarm.userNickname}님의 게시글에 {changeWord(alarm.noticeType)}을 남겼습니다.
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", pt:1 }}>
                <Button
                onClick={() => {
                  AlarmRead(alarm.idx)
                  goArticle(alarm.articeIdx)
                }}>
                  <span style={{color:"#3F74C8", fontWeight:'bold', fontSize:15}}>Go</span>
                </Button>
                <Button
                onClick={() => {AlarmDelete(alarm.idx)}}
                >
                  <span style={{ color: "#EC6C3D", fontWeight:'bold' }}>delete</span>
                </Button>
              </Box>
            </CardContentNoPadding>
          </Card>
        </div>
        ))
        }
      </div>
    </>
  )
}

export default AlarmInfo;
