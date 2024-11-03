let url = process.env.url
let token = localStorage.getItem('accessToken')
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MDQ2ZTFkNDBlZTMzNjk4OWQ2ZTViZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDY0NDkyMSwiZXhwIjoxNzAzMjM2OTIxfQ.WV1iuNtShODeUSiBqcptq23mL3nUcrbpAakHLagWixg"
}
export async function getAllWareHouse(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/warehouses`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAllWareHousePaignation(page){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/warehouses?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getWareHouse(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/warehouses/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteWareHouse(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/warehouses/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteWarehouseWithProductID(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/deleteWithProductID`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createWareHouse(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateWareHouse(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function importProductWareHouse(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/importProduct`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function exportProductWareHouse(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/exportProduct`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function searchWareProductName(text){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "text": text
        })
    }
    let url_api = `${url}/warehouses/search`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function searchWareUser(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/searchUserWithName`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getLogByUserID(data, page){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/getLogByUserID?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getWareByProductID(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/getWareByProductID`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getLog(data, page){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/warehouses/getLogWarehouse?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


