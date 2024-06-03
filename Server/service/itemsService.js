import { executeQuery } from '../dataAccess/db.js';
import { addItemToAlbumQuery } from '../dataAccess/queries.js'
export class ItemsService {

    async getMyitmes(username) {
        // const myitmesQuery = getMyitmesQuery();
        // const result = await executeQuery(myitmesQuery, [username]);
        // if (result.length == 0) throw new Error
        // return result;
    }
    async addItem(item) {
        const addItemToAlbum = addItemToAlbumQuery();
        const result = await executeQuery(addItemToAlbum, [item.creationdate, item.idalbum, item.idtype, item.data]);
        return result;
    }
}