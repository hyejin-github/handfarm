import {BASE_URL, LOCAL_URL} from "../../config";

export async function fetchInfoArticle(nowCrop) {

    if(nowCrop === ""){
        nowCrop = "딸기"
    }else if(nowCrop === 10){
        nowCrop = "방울 토마토"
    }else if(nowCrop === 20){
        nowCrop = "파프리카"
    }

    const URL = `${BASE_URL}/community/정보/${nowCrop}`
    const response = await fetch(URL, {
        headers : {
            accessToken : localStorage.getItem("access_token")
        },
        method : "GET"
    })
    return response
}

export async function fetchRegionArticle(nowRegion){
    if(nowRegion === ""){
        nowRegion = "광주"
    }else if(nowRegion === 10){
        nowRegion = "서울"
    }else if(nowRegion === 20){
        nowRegion = "대전"
    }else if(nowRegion === 30){
        nowRegion = "부산"
    }else if(nowRegion === 40){
        nowRegion = "구미"
    }

    const URL = `${BASE_URL}/community/지역/${nowRegion}`
    const response = await fetch(URL, {
        headers : {
            accessToken : localStorage.getItem("access_token")
        },
        method : "GET"
    })
    return response
}

// export async function updateArticle(articleId){
//
//     const URL = `${LOCAL_URL}/community/${articleId}`
//     const response = await fetch(URL,{
//         method : "PUT",
//         headers : {
//             accessToken : localStorage.getItem("access_token"),
//             "Content-Type" : "application/json",
//         }
//     })
//     return response
// }

export async function deleteArticle(articleId){
    const URL = `${BASE_URL}/community/${articleId}`
    const response = await fetch(URL,{
        method : "DELETE",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function fetchArticleDetail(id) {
    const URL = `${BASE_URL}/community/${id}`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token")
        }
    })
    return response
}

export async function commentCreate(articleId, commentInput) {
    console.log(commentInput,articleId)

    const URL = `${BASE_URL}/community/${articleId}/comment`
    const response = await fetch(URL, {
        method : "POST",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            commentContent : commentInput,
            upIdx : 0
        })
    })
    return response
}

export async function commentUpdate(articleId, commentId) {
    const URL = `${BASE_URL}/community/${articleId}/comment/${commentId}`
    const response = await fetch(URL, {
        method : "PUT",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function commentDelete(articleId, commentId) {
    const URL = `${BASE_URL}/community/${articleId}/comment/${commentId}`
    const response = await fetch(URL, {
        method : "DELETE",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function articleLike(articleId) {

    const URL = `${BASE_URL}/community/${articleId}/like`
    const response = await fetch(URL, {
        method : "GET",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json",
        }
    })
    return response
}

export async function articleUpdate(userInput, articleId){

    const URL = `${BASE_URL}/community/${articleId}`
    const response = await fetch(URL, {
        method : "PUT",
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

export async function articleDelete(articleId){

    const URL = `${BASE_URL}/community/${articleId}`
    const responser = await fetch(URL, {
        method : "DELETE",
        headers : {
            accessToken : localStorage.getItem("access_token"),
            "Content-Type" : "application/json"
        }
    })

}
