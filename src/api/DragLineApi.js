import config from "../config/config";


const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};

export async function insertBoundary(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/insert_boundary`, requestOptions);
    return await response.json();
}

export async function updateInsertBoundary(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/update_insert_boundary`, requestOptions);
    return await response.json();
}