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
export async function getAllProduct(){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/products`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getProductPagination(page){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/products?page=${page}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function getAll(){
    let requestOptions = {
        method: 'POST',
        headers: headers
    }
    let url_api = `${url}/products/all`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getAllProductWithCategory(id){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: {
            "categoryID": id
        }
    }
    let url_api = `${url}/products/getProductCategory/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function getProduct(id){
    let requestOptions = {
        method: 'GET',
        headers: headers
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function deleteProduct(id){
    let requestOptions = {
        method: 'DELETE',
        headers: headers
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function createProduct(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/products/`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}

export async function updateProduct(id, data){
    let requestOptions = {
        method: 'PUT',
        headers: headers,
        body: data
    }
    let url_api = `${url}/products/${id}`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function updateStateProduct(data){
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: data
    }
    let url_api = `${url}/products/updateStateProduct`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}
export async function searchProductName(text){
    console.log(text);
    let requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "text": text
        })
    }
    let url_api = `${url}/products/search`
    const res = await fetch(url_api, requestOptions)
    return res.json()
}


