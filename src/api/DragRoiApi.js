import config from "../config/config";

const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // mode: 'no-cors', // Thêm option 'no-cors' vào request
};

export async function insertRoi(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/insert_roi`, requestOptions);
    const res = await response.json();
    return res;
}

export async function updateInsertRoi(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/update_insert_roi`, requestOptions);
    const res = await response.json()
    return res;
}

export async function deleteRoi(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/delete_roi`, requestOptions);
    const res = await response.json()
    return res;
}

export async function getRois(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/get_rois`, requestOptions);
    const res = await response.json()
    return res;
}

export async function getRoiProperty(data = {}) {
    requestOptions.body = JSON.stringify(data);
    const response = await fetch(`${config.BACKEND}/get_roi_property`, requestOptions);
    const res = await response.json()
    return res;
}