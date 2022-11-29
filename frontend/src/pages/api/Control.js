import { BASE_URL } from "../../config";
import axios from "axios";

export async function controlState(props) {  
  let data = {
    controlName: props.control,
    controlValue: props.switchState
  }
  const URL = `${BASE_URL}/farm/${props.deviceId}`
  axios.post(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token")
    }
  })
    // .then(response => {
    //   console.log(response.data)
    // })
}

export async function axiosDegree(props) {
  let data = {
    controlName: props.control,
    controlValue: props.d
  }
  const URL = `${BASE_URL}/farm/${props.deviceId}/manual`
  axios.put(URL, JSON.stringify(data), {
    headers: {
      "Content-Type": `application/json`,
      accessToken: localStorage.getItem("access_token")
    }
  })
    // .then(response => {
    //   console.log(response.data)
    // })
}