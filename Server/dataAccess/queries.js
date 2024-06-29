export function getPasswordQuery() {
  const query = `select users.username,nickname,users.id,email from albumdb.users,albumdb.auth
    where users.username = auth.username and users.isActive = 1 and auth.username = ? and auth.password=?;`;
  return query;
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
  return `SELECT DISTINCT userChild.username as childName,album.id as albumId, creationdate,album.name, album.albumPhoto
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent,albumdb.album
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 and album.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id and album.childandparentid=childandparent.id`;
}
export function getMyItmesQuery() {
  return `SELECT * FROM albumdb.itemsofalbum
    where idalbum=?;`;
}
export function myAlbumsQuery()
{
  return `SELECT creationdate,users.username as childName, album.id as albumId,album.name,album.albumPhoto,album.creationdate FROM albumdb.users,albumdb.childandparent,albumdb.album where
 username=? and users.id=childandparent.idchild and album.childandparentid=childandparent.id
 and users.isactive=1 and childandparent.isactive=1 and album.isactive=1;`
}
export function isChildQuery() {
  `select childUser.id,childUser.username from albumdb.users as childUser, albumdb.users as parentUser,albumdb.childandparent 
    where 
   childUser.username=? and parentUser.username=? 
    and 
    childUser.birthday=? and
    childUser.id=childandparent.idchild and parentUser.id=childandparent.idparent;`;
}
export function getMyChildrenQuery() {
  return `SELECT DISTINCT userChild.username as childName, userChild.nickname
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and childandparent.idchild=userChild.id;`;
}

export function addChildAlbumQuery() {
  return `INSERT INTO album ( name, childandparentid, creationdate, albumPhoto) VALUES ( ?, ?, ?, ?);`;
}
export function addAuthQuery() {
  return `INSERT INTO albumdb.auth (username, password) VALUES (?, ?);`;
}
export function getUserId() {
  return `select id from albumdb.users where  username=?`;
}
export function updateEmailUserQuery() {
  return `UPDATE albumdb.users SET email = ? WHERE (username = ?)`;
}
export function getParentChildRelationIdQuery() {
  return `SELECT DISTINCT childandparent.id as relationId 
    FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
    where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
    and  userParent.username=? and childandparent.idparent=userParent.id 
    and userChild.username=? and childandparent.idchild=userChild.id;`;
}
export function addUserQuery() {
  return `INSERT INTO albumdb.users (username, nickname, email, birthday,isactive) VALUES (?, ?, ?, ?, 1);`;
}

export function addItemToAlbumQuery() {
  return `INSERT INTO albumdb.itemsofalbum (creationdate, idalbum, idtype, data) VALUES (?, ?, ?, ?);`;
}
export function getItemTypesQuery() {
  return `SELECT id as "optionLabel",description as "option" FROM datatype;`;
}
export function addChildAsUser() {
  return `INSERT INTO albumdb.users (username, nickname, email, isactive, birthday) VALUES (?, ?, 'empty@gmail.com', '1', ?);`;
}
export function addChildToParent() {
  return `INSERT INTO albumdb.childandparent (idparent, idchild) VALUES (?, ?);
`;
}
