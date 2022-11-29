import { atom } from 'recoil';
import {recoilPersist} from "recoil-persist";

const { persistAtom } = recoilPersist()

// 유저 정보
export const userInfo = atom({
    key : "userInfo",
    default : [{
        refreshToken: '',
        isRegisted: false,
        userNickname: '',
        deviceId: '',
        isLogged: false,
        userEmail: ''
    }],
    effects_UNSTABLE: [persistAtom],
})

export const userFarm = atom({
    key : "userFarm",
    default : {
        deviceInfo : []
    },
    effects_UNSTABLE: [persistAtom],
})

// 알람 모달 on/off
export const alarmState = atom({
    key: 'alarmState',
    default: false,
    effects_UNSTABLE: [persistAtom],
})


// 마이페이지 센서 모달 on/off
export const sensorModalState = atom({
    key : 'sensorModalState',
    default : false,
    effects_UNSTABLE : [persistAtom],
})

//

export const nowCrop = atom({
    key : "crop",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

export const nowRegion = atom({
    key : "region",
    default : "",
    effects_UNSTABLE : [persistAtom],
})

export const chatAnother = atom({
    key : "chatAnother",
    default : "",
    effects_UNSTABLE : [persistAtom]
})

// 디바이스 센서 값
export const deviceSensor = atom({
    key: "deviceSensor",
    default: [],
    effects_UNSTABLE : [persistAtom],
})

// 제어 자동/수동 정보
export const motorControl = atom({
    key: 'motorControl',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

// 위도/경도 정보
export const locations = atom({
    key: 'locations',
    default: [],
    effects_UNSTABLE: [persistAtom]
})

// Tab change
export const changeTab = atom({
    key: 'changeTab',
    default: 0,
    effects_UNSTABLE: [persistAtom]
})

// 카메라 정보
export const cameraInfo = atom({
    key: 'cameraInfo',
    default: "",
    effects_UNSTABLE: [persistAtom]
})

// 제어 모달
export const motorModal = atom({
    key: 'motorModal',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

// 농장 수정 모달
export const updateModal = atom({
    key: 'updateModal',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

// 마이페이지 유저 농장
export const myPageUserFarm = atom({
    key : 'myPageUserFarm',
    default : [],
    effects_UNSTABLE : [persistAtom],
})

export const sensorValue = atom({
    key : 'sensorValue',
    default : {
        area : "",
        value : ""
    },
    effects_UNSTABLE : [persistAtom],
})