import { executeQuery } from '../dataAccess/db.js';
import { getMyChildrenAlbumQuery, myAlbumsQuery, addQuery, getParentChildRelationIdQuery/*, updateQuery, getQuery, getByValueQuery, deleteQuery */ } from '../dataAccess/queries.js';

export class AlbumService {
    async getMyAlbums(username) {
        const myAlbumQuery = myAlbumsQuery();
        const result = await executeQuery(myAlbumQuery, [username]);
        return result;
    }
    async getMyChildrenAlbum(username) {
        const myChildrenAlbumQuery = getMyChildrenAlbumQuery();
        const result = await executeQuery(myChildrenAlbumQuery, [username]);
        return result;
    }
    async addChildAlbum(username, reqBody, imgSrc) {
        const addAlbumToChild = addQuery('album');
        const w = getParentChildRelationIdQuery()
        const relationId = await executeQuery(w, [username, reqBody.childUserName]);
        const result = await executeQuery(addAlbumToChild, [reqBody.name, relationId[0].relationId, reqBody.creationdate, imgSrc]);
        return result;
    }
}