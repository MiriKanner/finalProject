export function getPasswordQuery() {
    const query = `select users.username,nickname,email from albumdb.users,albumdb.auth
    where users.username = auth.username and users.isActive = 1 and auth.username = ? and auth.password=?;`;
    return query
}
/*
export function addQuery(tableName, itemKeys) {
    let keys = "", QuestionMark = "";
    itemKeys.forEach(element => {
        keys += element + ',';
        QuestionMark += "?,"
    })
    const query = `INSERT INTO db.${tableName} (${keys.slice(0, -1)}) VALUES (${QuestionMark.slice(0, -1)})`
    return query
}*/
export function getMyChildrenAlbumQuery() {
    return `SELECT DISTINCT userChild.username as childName,album.id as albumId, album.name 
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent,albumdb.album
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 and album.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id and album.childandparentid=childandparent.id`;
}

export function getMyChildrenQuery() {
    return `SELECT DISTINCT userChild.username as childName, userChild.nickname
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id;`;
}

export function addChildAlbumQuery() {
    return `INSERT INTO album ( name, childandparentid, creationdate) VALUES ( ?, ?, ?);`
}

export function getParentChildRelationIdQuery() {
    return `SELECT DISTINCT childandparent.id as relationId 
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and userChild.username=? and childandparent.idchild=userChild.id;`
}
export function addUserQuery() {
    return `INSERT INTO albumdb.users (username, nickname, email,isactive, birthday) VALUES (?, ?, ?, ?, ?);`
}
export function addAuthQuery() {
    return `INSERT INTO albumdb.auth ( username, password) VALUES (?, ?);`
}
export function addItemToAlbumQuery() {
    return `INSERT INTO albumdb.itemsofalbum (creationdate, idalbum, idtype, data) VALUES (?, ?, ?, ?);`
}
export function getItemTypesQuery() {
    return `SELECT id as "optionLabel",description as "option" FROM datatype;`
}