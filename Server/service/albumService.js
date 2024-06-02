
import { executeQuery } from '../dataAccess/db.js';
import { getMyChildrenAlbumQuery, addChildAlbum,getParentChildRelationId/*, updateQuery, getQuery, getByValueQuery, deleteQuery */ } from '../dataAccess/queries.js';


export class AlbumService {

    async getMyChildrenAlbum(username) {
        const myChildrenAlbumQuery = getMyChildrenAlbumQuery();
        const result = await executeQuery(myChildrenAlbumQuery, [username]);
        if (result.length == 0) throw new Error
        return result;
    }
    async addChildAlbum(username, reqBody) {
        const addAlbumToChild = addChildAlbum();
        const w=getParentChildRelationId()
        console.log(username+" this is data "+reqBody)
        const relationId = await executeQuery(w,[username,reqBody.childUserName]);
       // console.log(relationId[0].relationId +'   id')
       const result = await executeQuery(addAlbumToChild, [reqBody.name, relationId[0].relationId, reqBody.creationdate]);
        return result;
    }
    // async addUserAndalbum(userAndalbumItem) {
    //     const albumQuery = addQuery('album', ['userName', 'password', 'isActive'])
    //     const userQuery = addQuery('users', ['name', 'email', 'phone', 'isActive']);
    //     const albumResult = await executeQuery(albumQuery, [userAndalbumItem.name, userAndalbumItem.password, 1]);
    //     const userResult = await executeQuery(userQuery, [userAndalbumItem.id, userAndalbumItem.name, userAndalbumItem.email, userAndalbumItem.phone, 1]);
    //     return {
    //         albumResult: albumResult,
    //         userResult: userResult
    //     }
    // }
    // async updatealbum(albumItem) {
    //     const verifyQuery = getByValueQuery('album','userName')
    //     const result1 = await executeQuery(verifyQuery, [albumItem.name]);
    //     if (result1[0].password == albumItem.oldPassword) {
    //         let albumQuery = updateQuery('album', ['password']);
    //         const result2 = await executeQuery(albumQuery, [ albumItem.newPassword, albumItem.name]);
    //         return { result2 }
    //     }else {
    //         throw new Error('albumentication failed')
    //     }
    // }

    // async deletealbumAndUser (userItem) {
    //     const deletealbum = deleteQuery('album');
    //     const deleteUser = deleteQuery('users');
    //     const albumResult = await executeQuery(deletealbum, [userItem.name]);
    //     const userResult = await executeQuery(deleteUser, [userItem.userId]);
    //     return {
    //         albumResult: albumResult,
    //         userResult: userResult
    //     }
    // }

}