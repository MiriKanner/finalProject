import Cookies from "js-cookie";

const URL = "http://localhost:8080"
export async function getReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`${URL}/${req.route}`, {
        method: 'GET',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`${URL}/${req.route}`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function putReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`${URL}/${req.route}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function deleteReq(req) {
    let answer;
    const token = Cookies.get('token');
    const urlReq = `${URL}/${req.route}`
    await fetch(urlReq, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postMediaReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`${URL}/${req.route}`, {
        method: 'POST',
        body: req.body,
        headers: {
            authorization: token,
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
    }).then(data => {
        answer = data
    });
    return answer;
}