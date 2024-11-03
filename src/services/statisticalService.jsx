let url = process.env.url
let token;
if (typeof localStorage !== 'undefined') {
  token = localStorage.getItem('accessToken');
} else {
  console.warn('localStorage is not available.');
  token = null;
}
const headers = {
    "Content-Type": "application/json",
    "token": "Bearer "+token
}

export async function getStatistical(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/getStatisticalWithDay`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getStatisticalReview(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalReview`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getStatisticalUser(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalUser`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getStatisticalUserChart(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalUseChart`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getStatisticalOrder(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalOrder`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getStatisticalOrderChart(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalOrderChart`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getStatisticalReviewChart(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalReviewChart`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getStatisticalWarehouse(data, page){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/statisticals/statisticalWarehouse?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}