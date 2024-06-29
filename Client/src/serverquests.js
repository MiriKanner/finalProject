import Cookies from "js-cookie";

export async function getReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'GET',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
        //console.log(response.headers.getSetCookie());
        // for (let entry of response.headers.entries()) {
        //     console.log('header',entry);
        // }
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
        //console.log(response.headers.getSetCookie());
        // for (let entry of response.headers.entries()) {
        //     console.log('header',entry);
        // }
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function putReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
        //console.log(response.headers.getSetCookie());
        // for (let entry of response.headers.entries()) {
        //     console.log('header',entry);
        // }
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function deleteReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'DELETE',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
            authorization: token,
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
        //console.log(response.headers.getSetCookie());
        // for (let entry of response.headers.entries()) {
        //     console.log('header',entry);
        // }
    }).then(data => {
        answer = data
    });
    return answer;
}

export async function postMediaReq(req) {
    let answer;
    const token = Cookies.get('token');
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'POST',
        body: req.body,
        headers: {
            authorization: token,
        },
    }).then(response => {
        if (response.ok)
            return response
        else throw new Error
        //console.log(response.headers.getSetCookie());
        // for (let entry of response.headers.entries()) {
        //     console.log('header',entry);
        // }
    }).then(data => {
        answer = data
    });
    return answer;
}