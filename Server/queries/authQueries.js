export function updateEmailUserQuery() {
    return `UPDATE albumdb.users SET email = ? WHERE (username = ?)`;
  }
  
  export function getUserId() {
    return `select id from albumdb.users where  username=?`;
  }
  export function getPasswordQuery() {
    const query = `select users.username,nickname,users.id,email from albumdb.users,albumdb.auth
      where users.username = auth.username and users.isActive = 1 and auth.username = ? and auth.password=?;`;
    return query;
  }
  export function isChildQuery() {
    return `select childUser.id,childUser.username from albumdb.users as childUser, albumdb.users as parentUser,albumdb.childandparent 
      where 
     childUser.username=? and parentUser.username=? 
      and 
      childUser.birthday=? and
      childUser.id=childandparent.idchild and parentUser.id=childandparent.idparent;`;
  }