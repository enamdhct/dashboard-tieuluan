let url = process.env.url

// let token = localStorage.getItem('accessToken')
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDY0NDkyMSwiZXhwIjoxNzAzMjM2OTIxfQ.WV1iuNtShODeUSiBqcptq23mL3nUcrbpAakHLagWixg"
}
export async function getAllOrder(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/orders`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getRequest(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/refunds/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteOrder(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/orders/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createOrder(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateRefund(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/refunds/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getOrderWithState(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/getOrderWithState`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function searchOrder(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/search`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAll(page, type){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: type
    }
    let url_api = `${url}/refunds/all?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getUserOrder(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/orders/userOrderDash`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}



