import { executeQuery } from '../dataAccess/db.js';
import {getMyChildrenQuery,addChildAsUser,addChildToParent} from '../dataAccess/queries.js'

export class ChildrenService {

    async getMyChildren(username){
        const myChildrenQuery = getMyChildrenQuery();
        const result = await executeQuery(myChildrenQuery, [username]);
        if (result.length == 0) throw new Error
        return result;
    }
    async addChildToParent(childItem)
    {
        const addChildAsUserQ = addChildAsUser();
        const addChildToParentQ=addChildToParent();   
        const childResult = await executeQuery(addChildAsUserQ,[childItem.username,childItem.nickname,childItem.birthday]);
        console.log(childResult.insertId)
        console.log(childItem.idparent)
        const result = await executeQuery(addChildToParentQ, [childItem.idparent,childResult.insertId]);
        return result;
    }
}