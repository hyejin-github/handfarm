import React, {useState} from "react"
import { BASE_URL } from "../../config";
import axios from "axios";

// 농장 정보 조회
export async function farmInfo() {

  const response = await axios.get('https://handfarm.co.kr/api/farm', {
    headers: {
      accessToken: localStorage.getItem('access_token')
    }
  })

  return response
}


// 농장 등록 API
export async function myFarmCreate({ deviceID, myFarmName, myCrops }) {  

  const URL = `${BASE_URL}/farm`
  let data = {
    'deviceNo': deviceID,
    'deviceName': myFarmName, 
    'deviceCrops': myCrops
  }
  
  return await axios.post(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token"),
    }
  })
    .then(response => {
      console.log(response.data)
      return response.data.message
    })
    .catch(err => {
      console.log(err)
    })
};

// 센서 수동 설정
export async function sensorManual(props) {
  console.log(props)
  var data = null
  if (props.controlName === 'temp') {
    var data = {
      controlName: props.controlName,
      controlValue: [props.highTemp, props.lowTemp]
    }
  } else if (props.controlName === 'fan') {
    var data = {
      controlName: props.controlName,
      controlValue: props.co2Setting
    } 
  } else if (props.controlName === 'pump') {
    var data = {
      controlName: props.controlName,
      controlValue: props.soilHumidSetting
    }
  } else if (props.controlName === 'led') {
    var data = {
      controlName: props.controlName,
      controlValue: [props.startLed, props.endLed]
    }
  }

  const URL = `${BASE_URL}/farm/${props.deviceId}/auto`
  axios.put(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token"),
    }
  })
    .then(response => {
      console.log(response.data)
    })
}

// 센서 자동 설정 값 받아오기
export async function sensorAuto(props) {
  const URL = `${BASE_URL}/farm/${props.deviceId}`
  let data = {
    controlName: props.controlName,
  }
  const response = axios.put(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token"),
    }
  })
  return response
}

export async function sensorSetting(props) {
  const URL = `${BASE_URL}/farm/${props.nickName}/auto`
  const response = await axios.get(URL, {
    headers: {
      accessToken: localStorage.getItem("access_token"),
    }
  })
  return response
}

// 센서 시간별 데이터 가져오기
export async function sensorHours(props) {
  const URL = `${BASE_URL}/farm/${props.deviceId}/log/${props.sensorName}/hour`
  const response = await axios.get(URL, {
    headers: {
      accessToken: localStorage.getItem("access_token"),
    }
  })
  return response
}

// 센서 주간별 데이터 가져오기
export async function sensorDay(props) {
  const URL = `${BASE_URL}/farm/${props.deviceId}/log/${props.sensorName}/day`
  const response = await axios.get(URL, {
    headers: {
      accessToken: localStorage.getItem("access_token"),
    }
  })
  return response
}

// 날씨 API
export async function getWeather(props) {
  const lat = props.lat
  const lon = props.lon
  const API_KEY = '32772117ac1406fcd8705a8c452031b3'
  const URL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&lat=${lat}&lon=${lon}&appid=${API_KEY}`
  const response = await axios.get(URL)

  return response
}

// 농장 수정
export async function updateFarm({deviceId, farmName, myCrops}) {
  const URL = `${BASE_URL}/farm`
  let data = {
    'deviceNo': deviceId,
    'deviceName': farmName, 
    'deviceCrops': myCrops
  }
  
  const response = await axios.put(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken : localStorage.getItem("access_token")
    }
  })

  return response
}

// 농장 삭제
export async function deleteFarm({deviceId}) {
  const URL = `${BASE_URL}/farm/${deviceId}`
  const response = await axios.delete(URL, {
    headers: {
      accessToken: localStorage.getItem('access_token')
    }
  })
  return response
}
