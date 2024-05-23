export default async function fetchRequ(req) {
    let answer;
    await fetch(`http://localhost:8080/${req.route}`, {
        method: req.method,
        body: JSON.stringify(req.body),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }).then(response => response.json())
        .then(data => answer = data);
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