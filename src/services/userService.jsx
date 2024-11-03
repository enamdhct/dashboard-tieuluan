let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getUser(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/users/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function updateUser(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/users/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function searchUserWithName(text){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "text": text
        })
    }
    let url_api = `${url}/users/search`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAll(){
    let requestOptions = {
        method: 'POST',
        headers: headers,
    }
    let url_api = `${url}/users/all`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteUser(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers,
    }
    let url_api = `${url}/users/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createUser(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/users/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function changePassword(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/users/change-password`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}



