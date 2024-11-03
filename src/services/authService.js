let url = process.env.url
const headers = {
    "Content-Type": "application/json"
}

export async function Login(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/auth/login`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
