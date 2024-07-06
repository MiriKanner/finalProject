import { executeQuery } from '../dataAccess/db.js';
import { addQuery, getSpecialParamsQuery } from '../queries/genericQueries.js';
import { getMyChildrenQuery } from '../queries/childrenQueries.js';

export class ChildrenService {

    async getMyChildren(username, query) {
        let myChildrenQuery = getMyChildrenQuery();
        myChildrenQuery += getSpecialParamsQuery('users', query)
        const result = await executeQuery(myChildrenQuery, [username]);
        return result;
    }

    async addChildToParent(childItem) {
        const addChildAsUserQ = addQuery('users');
        const addChildToParentQ = addQuery('childandparent');
        const childResult = await executeQuery(addChildAsUserQ, [childItem.username, childItem.nickname, "", childItem.birthday]);
        const result = await executeQuery(addChildToParentQ, [childItem.idparent, childResult.insertId]);
        return result;
    }
}