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

    /*
    async verifyIsChild(childItem) {
        const ischildQuery = isChildQuery();
        const result = await executeQuery(ischildQuery, [childItem.username, childItem.usernameParent, childItem.birthday]);
        if (result.length == 0) throw new { errno: 404, message: "no such child" }
        return result;
    }*/

    async addChildToParent(childItem) {
        const addChildAsUserQ = addQuery('users');
        const addChildToParentQ = addQuery('childandparent');
        const childResult = await executeQuery(addChildAsUserQ, [childItem.username, childItem.nickname, "", childItem.birthday]);
        const result = await executeQuery(addChildToParentQ, [childItem.idparent, childResult.insertId]);
        return result;
    }
}