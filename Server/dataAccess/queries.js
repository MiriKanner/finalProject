const Keys = {
  users: ["username", "nickname", "email", "birthday"],
  childandparent: ["idparent", "idchild"],
  itemsofalbum: ["creationdate", "idalbum", "idtype", "data"],
  album: ["name", "childandparentid", "creationdate", "albumPhoto"],
  auth: ["username", "password"],
};

export function getSpecialParamsQuery(itemKeys, query) {
  let addToQuery = "";
  itemKeys.forEach((element) => {
    !(typeof query[element] === "undefined")
      ? (addToQuery += " and " + element + " LIKE '%" + query[element] + "%'")
      : "";
  });
  if (query._sort) addToQuery = addToQuery + "  ORDER BY " + query._sort;
  if (query._limit) addToQuery = addToQuery + "  LIMIT " + query._limit;
  else if (query._page) addToQuery = addToQuery + "  LIMIT " + query._page;
  return addToQuery;
}
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
    where idalbum=? and isactive=1;`;
}
export function myAlbumsQuery() {
  return `SELECT creationdate,users.username as childName, album.id as albumId,album.name,album.albumPhoto,album.creationdate FROM albumdb.users,albumdb.childandparent,albumdb.album where
 username=? and users.id=childandparent.idchild and album.childandparentid=childandparent.id
 and users.isactive=1 and childandparent.isactive=1 and album.isactive=1;`;
}
export function isChildQuery() {
  return `select childUser.id,childUser.username from albumdb.users as childUser, albumdb.users as parentUser,albumdb.childandparent 
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
export function addQuery(tableName) {
  const itemKeys=Keys[tableName]
  let keys = "",
    QuestionMark = "";
  itemKeys.forEach((element) => {
    keys += element + ",";
    QuestionMark += "?,";
  });
  const query = `INSERT INTO albumdb.${tableName} (${keys.slice(
    0,
    -1
  )}) VALUES (${QuestionMark.slice(0, -1)})`;
  return query;
}
export function getItemTypesQuery() {
  return `SELECT id as "optionLabel",description as "option" FROM datatype;`;
}

export function getQuery(tableName) {
  const query = `SELECT * FROM db.${tableName} where ${tableName}.isActive = 1`;
  return query;
}

export function getByValueQuery(tableName, value) {
  const query = `SELECT * FROM db.${tableName}  where ${value} = ? and ${tableName}.isActive = 1`;
  return query;
}

export function deleteQuery(tableName) {
  let primaryKey = "id";
  if (tableName == "auth") {
    primaryKey = "userName";
  }
  const query = `UPDATE albumdb.${tableName} SET isactive = 0 WHERE ${primaryKey} = ? `;
  return query;
}

export function updateQuery(tableName, itemKeys) {
  let keys = "";
  itemKeys.forEach((element) => {
    keys += `${element} = ?,`;
  });
  let primaryKey = "id";
  if (tableName == "auth") primaryKey = "userName";
  const query =
    `UPDATE db.${tableName} SET ${keys.slice(0, -1)} WHERE ` +
    primaryKey +
    ` = ? and ${tableName}.isActive = 1 `;
  return query;
}
