/*
export default async function fetchRequ(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: req.method || 'GET',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
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
        //     console.log(data)
    });
    return answer;
}
*/

export async function getReq(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'GET',
        headers: {
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
        //     console.log(data)
    });
    return answer;
}

export async function postReq(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'POST',
        body: req.body,//JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
         //   'Content-type': 'application/json; charset=UTF-8',

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
        //     console.log(data)
    });
    return answer;
}




export async function putReq(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'PUT',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
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
        //     console.log(data)
    });
    return answer;
}



export async function deleteReq(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: 'DELETE',
        body: JSON.stringify(req.body),
        //    credentials: 'same-origin',
        headers: {
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
        //     console.log(data)
    });
    return answer;
}
// export default{
//     fetchRequ
// }
/*req יראה ככה:
method(put/post/get/delete)
route(הניתוב אליו הוא אמור לגשת ב    server)
body(הבקשה, יש מצב שיהיה ריק)
token/ refresh token
ואז צריך לבדוק מה קורה עם התשובה ולאן צריך שלוח אותה

*/