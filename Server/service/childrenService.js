import { executeQuery } from '../dataAccess/db.js';
import { getMyChildrenQuery, isChildQuery, addQuery } from '../dataAccess/queries.js'

export class ChildrenService {
    async getMyChildren(username) {
        const myChildrenQuery = getMyChildrenQuery();
        const result = await executeQuery(myChildrenQuery, [username]);
        return result;
    }
    async vertifyIsChild(childItem) {
        const ischildQuery = isChildQuery();
        const result = await executeQuery(ischildQuery, [childItem.username, childItem.usernameParent, childItem.birthday]);
        if (result.length == 0) throw new Error//there is no child with this details
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