import { executeQuery } from '../dataAccess/db.js';
import { addQuery ,deleteQuery,getSpecialParamsQuery} from '../queries/genericQueries.js';
import { getItemTypesQuery ,getMyItmesQuery} from '../queries/itemsQueries.js';
export class ItemsService {
    async deleteItem(itemId) {
        const deleteItemQuery = deleteQuery('itemsofalbum')
        const result = await executeQuery(deleteItemQuery, [itemId]);
        return result
    }
    async allItemTypes() {
        let allItemTypes = getItemTypesQuery();
        allItemTypes+=getSpecialParamsQuery('itemsofalbum')
        const result = await executeQuery(allItemTypes);
        return result;
    }
    async getMyItmes(albumId,query) {
        let myItmesQuery = getMyItmesQuery();
        myItmesQuery+=getSpecialParamsQuery('itemsofalbum',query);
        const result = await executeQuery(myItmesQuery, [albumId]);
        return result;
    }
    async addItem(albumId, item) {
        const addItemQ = addQuery('itemsofalbum')
        const result = await executeQuery(addItemQ, [item.creationdate, albumId, item.idtype, item.data]);
        return result;
    }
}