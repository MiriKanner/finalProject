
import { executeQuery } from '../dataAccess/db.js';
import pkg from 'crypto-js';
import { getPasswordQuery/*, updateQuery, getQuery, getByValueQuery, deleteQuery */} from '../dataAccess/queries.js';
const { SHA256, enc } = pkg;
import jwt from "jsonwebtoken"


export class AuthService {

    async verifyUserAuth(authItem) {
        const authQuery = getPasswordQuery();
        const password = SHA256(authItem.password).toString(enc.Hex);
        const result = await executeQuery(authQuery, [authItem.username,password]);
        if (result.length == 0) throw new Error
        const token = jwt.sign({ id: authItem.username }, "privateKey", { expiresIn: '20m' });
        const refreshtoken = jwt.sign({ id: authItem.username }, "keyrefresh", { expiresIn: '1d' });
        return {'result':result,'token':token,'refreshtoken':refreshtoken};
            // verified: result[0].password == authItem.password,
            // userData: {
            //     id: result[0].id,
            //     name: result[0].name,
            //     email: result[0].email,
            //     phone: result[0].phone
            // }
        
    }
    async addUserAndAuth(userAndAuthItem) {
        const authQuery = addQuery('auth', ['userName', 'password', 'isActive'])
        const userQuery = addQuery('users', ['name', 'email', 'phone', 'isActive']);
        const authResult = await executeQuery(authQuery, [userAndAuthItem.name, userAndAuthItem.password, 1]);
        const userResult = await executeQuery(userQuery, [userAndAuthItem.id, userAndAuthItem.name, userAndAuthItem.email, userAndAuthItem.phone, 1]);
        return {
            authResult: authResult,
            userResult: userResult
        }
    }
    // async updateAuth(authItem) {
    //     const verifyQuery = getByValueQuery('auth','userName')
    //     const result1 = await executeQuery(verifyQuery, [authItem.name]);
    //     if (result1[0].password == authItem.oldPassword) {
    //         let authQuery = updateQuery('auth', ['password']);
    //         const result2 = await executeQuery(authQuery, [ authItem.newPassword, authItem.name]);
    //         return { result2 }
    //     }else {
    //         throw new Error('Authentication failed')
    //     }
    // }

    // async deleteAuthAndUser (userItem) {
    //     const deleteAuth = deleteQuery('auth');
    //     const deleteUser = deleteQuery('users');
    //     const authResult = await executeQuery(deleteAuth, [userItem.name]);
    //     const userResult = await executeQuery(deleteUser, [userItem.userId]);
    //     return {
    //         authResult: authResult,
    //         userResult: userResult
    //     }
    // }

}