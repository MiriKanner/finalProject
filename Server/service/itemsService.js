import { executeQuery } from '../dataAccess/db.js';
import { addItemToAlbumQuery, getItemTypesQuery } from '../dataAccess/queries.js'
export class ItemsService {

    async allItemTypes() {
        const allItemTypes = getItemTypesQuery();
        const result = await executeQuery(allItemTypes);
        return result;
    }

    async getMyItmes(albumId) {
        // const myitmesQuery = getMyitmesQuery();
        // const result = await executeQuery(myitmesQuery, [username]);
        // if (result.length == 0) throw new Error
        // return result;
    }

    async addItem(albumId,item) {
        const addItemToAlbum = addItemToAlbumQuery();
        const result = await executeQuery(addItemToAlbum, [item.creationdate, albumId, item.idtype, item.data]);
        return result;
    }
}