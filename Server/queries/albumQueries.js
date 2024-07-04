export function getMyChildrenAlbumQuery() {
    return `SELECT DISTINCT userChild.username as childName,album.id as albumId, creationdate,album.name, album.albumPhoto
      FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent,albumdb.album
      where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 and album.isActive=1 
      and  userParent.username=? and childandparent.idparent=userParent.id 
      and childandparent.idchild=userChild.id and album.childandparentid=childandparent.id`;
  }
  export function myAlbumsQuery() {
    return `SELECT creationdate,users.username as childName, album.id as albumId,album.name,album.albumPhoto,album.creationdate FROM albumdb.users,albumdb.childandparent,albumdb.album where
   username=? and users.id=childandparent.idchild and album.childandparentid=childandparent.id
   and users.isactive=1 and childandparent.isactive=1 and album.isactive=1;`;
  }
  export function getParentChildRelationIdQuery() {
    return `SELECT DISTINCT childandparent.id as relationId 
      FROM albumdb.auth,albumdb.users as userParent,albumdb.users as userChild,albumdb.childandparent
      where userChild.isActive=1 and userParent.isActive=1 and childandparent.isActive=1 
      and  userParent.username=? and childandparent.idparent=userParent.id 
      and userChild.username=? and childandparent.idchild=userChild.id;`;
  }