export function getMyChildrenQuery() {
    return `SELECT DISTINCT userChild.username as childName, userChild.nickname
      FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
      where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
      and  userParent.username=? and childandparent.idparent=userParent.id 
      and childandparent.idchild=userChild.id;`;
  }

  export function isChildQuery() {
    return `select childUser.id,childUser.username from albumdb.users as childUser, albumdb.users as parentUser,albumdb.childandparent 
      where 
     childUser.username=? and parentUser.username=? 
      and 
      childUser.birthday=? and
      childUser.id=childandparent.idchild and parentUser.id=childandparent.idparent;`;
  }