const URL = "http://localhost:8080"

export async function getReq(req) {
    let answer;
    await fetch(`${URL}/${req.route}`, {
        method: 'GET',
        headers: {
            'Origin': 'http://localhost:8080',
        },
        credentials: 'include'
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
    await fetch(`${URL}/${req.route}`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
            'Origin': 'http://localhost:8080',
            'Content-type': 'application/json; charset=UTF-8',
        },
        credentials: 'include'
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
    await fetch(`${URL}/${req.route}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Origin': 'http://localhost:8080'
        },
        credentials: 'include',
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
    const urlReq = `${URL}/${req.route}`
    await fetch(urlReq, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8', 'Origin': 'http://localhost:8080'
        }, credentials: 'include'

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