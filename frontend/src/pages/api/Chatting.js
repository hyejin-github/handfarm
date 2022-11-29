import {LOCAL_URL} from "../../config";
import {BASE_URL} from "../../config"
 
export async function fetchMyChattingRooms(){
    const URL = `${BASE_URL}/chatList`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem('access_token'),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function fetchMyChatDetail(roomId){
    const URL = `${BASE_URL}/chatList/${roomId}`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem('access_token'),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function createChatRoom(userName){

    const URL = `${BASE_URL}/chat/${userName}`
    const response = await fetch(URL,{
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
        })
    return response

}

export async function fetchChatSum(){
    const URL = `${BASE_URL}/chat/count`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
    })
    return response
}