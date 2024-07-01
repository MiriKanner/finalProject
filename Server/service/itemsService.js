import { executeQuery } from '../dataAccess/db.js';
import { getItemTypesQuery, getMyItmesQuery, addQuery, deleteQuery } from '../dataAccess/queries.js'
export class ItemsService {
    async deleteItem(itemId) {
        try {
            const deleteItemQuery = deleteQuery('itemsofalbum')
            const result = await executeQuery(deleteItemQuery, [itemId]);
            return result
        } catch (ex) { throw ex }
    }
    async allItemTypes() {
        const allItemTypes = getItemTypesQuery();
        const result = await executeQuery(allItemTypes);
        return result;
    }
    async getMyItmes(albumId) {
        const myItmesQuery = getMyItmesQuery();
        const result = await executeQuery(myItmesQuery, [albumId]);
        if (result.length == 0) throw new Error
        return result;
    }
    async addItem(albumId, item) {
        const addItemQ = addQuery('itemsofalbum')
        const result = await executeQuery(addItemQ, [item.creationdate, albumId, item.idtype, item.data]);
        return result;
    }
}