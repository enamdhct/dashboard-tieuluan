let url = process.env.url
const headers = {
    "Content-Type": "application/json",
}
export async function getAllVoucher(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/vouchers`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAll(page){
    let requestOptions = {
        method: 'POST',
        headers: headers
    }
    let url_api = `${url}/vouchers/all?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getVoucher(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteVoucher(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createVoucher(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/vouchers`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateVoucher(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/vouchers/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


