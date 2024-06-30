
import { executeQuery } from '../dataAccess/db.js';
import { getMyChildrenAlbumQuery,myAlbumsQuery, addQuery, getParentChildRelationIdQuery/*, updateQuery, getQuery, getByValueQuery, deleteQuery */ } from '../dataAccess/queries.js';


export class AlbumService {
    async getMyAlbums(username)
    {
        const myAlbumQuery = myAlbumsQuery();
        const result = await executeQuery(myAlbumQuery, [username]);
        if (result.length == 0) throw new Error
        return result;
    }
    async getMyChildrenAlbum(username) {
        const myChildrenAlbumQuery = getMyChildrenAlbumQuery();
        const result = await executeQuery(myChildrenAlbumQuery, [username]);
        if (result.length == 0) throw new Error
        return result;
    }
    async addChildAlbum(username, reqBody, imgSrc) {
        const addAlbumToChild = addQuery('album');
        const w = getParentChildRelationIdQuery()
        const relationId = await executeQuery(w, [username, reqBody.childUserName]);
        const result = await executeQuery(addAlbumToChild, [reqBody.name, relationId[0].relationId, reqBody.creationdate, imgSrc]);
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