let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getAllReview(page){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/reviews?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getReview(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/reviews/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


export async function deleteReview(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/reviews/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createReview(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/reviews/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateReview(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/reviews/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function searchReview(data, page){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/reviews/search?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


