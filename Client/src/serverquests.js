import Cookies from "js-cookie";
const URL = "http://localhost:8080"

function getToken() {
    let token = Cookies.get('token');
    // try {
    //     decode(token);
    //     const { exp } = decode(refreshToken);
    //     if (Date.now() >= exp * 1000) {
    //         return false;
    //     }
    // } catch (ex) { }
    return token;
}

export async function getReq(req) {
    let answer;
    const token = getToken()
    await fetch(`${URL}/${req.route}`, {
        method: 'GET',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
        withCredentials: true,
    }).then(response => {
        if (response.ok)
            return response
        else {
            throw (
                {
                    errorCode: response.status,
                    errorText: response.statusText
                }
            )
        }
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postReq(req) {
    let answer;
    const token = getToken()
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
        else throw (
            {
                errorCode: response.
                    status,
                errorText: response.
                    statusText
            })
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function putReq(req) {
    let answer;
    const token = getToken()
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
        else throw (
            {
                errorCode: response.
                    status,
                errorText: response.
                    statusText
            })
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function deleteReq(req) {
    let answer;
    const token = getToken()
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
        else throw new Error(
            {
                errorCode: response.
                    status,
                errorText: response.
                    statusText
            })
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postMediaReq(req) {
    let answer;
    const token = getToken()
    await fetch(`${URL}/${req.route}`, {
        method: 'POST',
        body: req.body,
        headers: {
            authorization: token,
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error(
            {
                errorCode: response.
                    status,
                errorText:
                    statusText
            })
    }).then(data => {
        answer = data
    });
    return answer;
}