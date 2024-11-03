let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getAllLocation(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/location`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


export async function getLocation(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/locations/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteLocation(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/locations/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createLocation(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/locations/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateLocation(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/locations/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getAllLocationUser(id){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "userID": id
        })
    }
    let url_api = `${url}/locations/getLocationUser/`
    const res = await fetch(url_api, requestOptions)
    return res.json()

}


