const Keys = {
  users: ["username", "nickname", "email", "birthday"],
  childandparent: ["idparent", "idchild"],
  itemsofalbum: ["creationdate", "idalbum", "idtype", "data"],
  album: ["name", "childandparentid", "creationdate", "albumPhoto"],
  auth: ["username", "password"],
};

export function getSpecialParamsQuery(tableName, query) {
  let addToQuery = "";
  Keys[tableName].forEach((element) => {
    !(typeof query[element] === "undefined")
      ? (addToQuery += " and " + element + " LIKE '%" + query[element] + "%'")
      : "";
  });
  if (query._sort) addToQuery = addToQuery + "  ORDER BY " + query._sort;
  if (query._start)
    if (query._limit) addToQuery = addToQuery + "  LIMIT " + query._start + "," + query._limit;
    else if (query._page) addToQuery = addToQuery + "  LIMIT " + query._start + "," + query._page;
    else if (query._end) addToQuery = addToQuery + "  LIMIT " + query._start + "," + query._end;
  return addToQuery;
}

export function addQuery(tableName) {
  const itemKeys = Keys[tableName]
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
