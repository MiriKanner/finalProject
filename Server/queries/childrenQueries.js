export function getMyChildrenQuery() {
    return `SELECT DISTINCT userChild.username as childName, userChild.nickname
      FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
      where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
      and  userParent.username=? and childandparent.idparent=userParent.id 
      and childandparent.idchild=userChild.id;`;
  }
