import { BASE_URL } from "../../config";
import {LOCAL_URL} from "../../config";
import axios from "axios";

export async function fetchUserInfo(userNickname) {
    console.log(userNickname)
    const URL = `${BASE_URL}/mypage/${userNickname}`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token")
        }
    })
    return response
}

export async function changeOpen(isOpen) {
    // if(isOpen){
    //     isOpen = 1
    // }else{
    //     isOpen = 0
    // }
    console.log(isOpen)
    const URL = `${BASE_URL}/mypage/`
    const response = await fetch(URL, {
        method : "PUT",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            userOpen : isOpen,
        })
    })
    return response
}

export async function updateUserInfo(userInfo) {
    const URL = `${BASE_URL}/mypage`
    const response = await fetch(URL, {
        method : "PUT",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json"
        }
    })
    return response
}

export async function fetchMyFarm(){
    const URL = `${BASE_URL}/farm`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json"
        },
    })
    return response

}

export async function referSensorSetting(userName, deviceNo, controlName, controlValue){
    console.log(userName, deviceNo, controlName, controlValue)
    const URL = `${BASE_URL}/farm/${userName}/auto/value`
    const response = await fetch(URL, {
        method : "PUT",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            deviceNo : deviceNo,
            controlName : controlName,
            controlValue : controlValue
        })
    })
    return response
}