export function getPasswordQuery() {
    const query = `select users.username,nickname,email from albumdb.users,albumdb.auth
    where users.username = auth.username and users.isActive = 1 and auth.username = ? and auth.password=?;`;
    return query
}

export function addQuery(tableName, itemKeys) {
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    const query = `INSERT INTO db.${tableName} (${keys.slice(0, -1)}) VALUES (${QuestionMark.slice(0, -1)})`
    return query
}