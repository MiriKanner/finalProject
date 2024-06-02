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
export function getMyChildrenAlbumQuery()
{
    return `SELECT  DISTINCT   userChild.username as childName,album.id as albumId, album.name 
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent,albumdb.album
     where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 and album.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id and album.childandparentid=childandparent.id`;
}

export function getMyChildrenQuery()
{
    return `SELECT  DISTINCT   userChild.username as childName, userChild.nickname
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
     where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id;`;
}