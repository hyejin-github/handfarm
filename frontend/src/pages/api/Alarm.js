import { BASE_URL } from "../../config";
import axios from "axios";

// 알림 전체 정보 조회 함수
export async function fetchAlarm() {
  const alarmAxios = await axios({
    method: "GET",
    url: `${BASE_URL}/alarm`,
    headers: {
      accessToken: localStorage.getItem("access_token"),
    }
  })
  return alarmAxios.data.noticeList
};

// 알림 읽음 함수
export async function AlarmRead(readId) {
  if (readId !== 0) {
    const response = axios({
      method: 'POST',
      url: `${BASE_URL}/alarm/${readId}`,
      headers: {
        accessToken: localStorage.getItem('access_token')
      }
    }) 
    return response
  }
};

// 알림 삭제 함수
export async function AlarmDelete(deleteId) {
  if (deleteId !== 0) {
    axios({
      method: 'DELETE',
      url: `${BASE_URL}/alarm/${deleteId}`,
      headers : {
        accessToken: localStorage.getItem('access_token')
      }
    })
      .then(res => {
        window.location.reload()
      })
  }
};

