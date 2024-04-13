import config from "../config/config";


const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // mode: 'no-cors', // Thêm option 'no-cors' vào request
};

export async function insertBoundary(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/insert_boundary`, requestOptions);
    const res = await response.json();
    return res;
}

export async function updateInsertBoundary(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/update_insert_boundary`, requestOptions);
    const res = await response.json()
    return res;
}

export async function deleteBoundary(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/delete_boundary`, requestOptions);
    const res = await response.json()
    return res;
}

export async function getBoundaries(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/get_boundaries`, requestOptions);
    const res = await response.json()
    return res;
}