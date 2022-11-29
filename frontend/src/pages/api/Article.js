import {BASE_URL, LOCAL_URL} from "../../config";

export async function articleCreate (userInput, category) {
    let area = "지역"
    if(category === "딸기" || category === "방울 토마토" || category === "파프리카") {
        area = "정보"
    }
    const URL = `${BASE_URL}/community/${area}/${category}`
    console.log(userInput)
    console.log(category)

    const response = await fetch(URL, {
        method : "POST",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            articleTitle : userInput.title,
            articleContent : userInput.content,
            articleImg : userInput.articleImg
        }),
    })
    return response

}