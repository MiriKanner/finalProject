import { executeQuery } from '../dataAccess/db.js';
import {getMyChildrenQuery} from '../dataAccess/queries.js'
export class ChildrenService {

    async getMyChildren(username){
        const myChildrenQuery = getMyChildrenQuery();
        const result = await executeQuery(myChildrenQuery, [username]);
        if (result.length == 0) throw new Error
        return result;
    }
}