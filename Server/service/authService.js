import { executeQuery } from "../dataAccess/db.js";
import pkg from "crypto-js";
import {
  getPasswordQuery,
  addUserQuery,
  addAuthQuery,
  updateEmailUserQuery,
  getUserId
} from "../dataAccess/queries.js";
const { SHA256, enc } = pkg;
import jwt from "jsonwebtoken";
import { signToken, signRefreshtoken } from "../middleware/jwt.js";
export class AuthService {
  async verifyUserAuth(authItem) {
    const authQuery = getPasswordQuery();
    const password = SHA256(authItem.password).toString(enc.Hex);
    const result = await executeQuery(authQuery, [authItem.username, password]);
    console.log(result);
    if (result.length == 0) throw new Error();
    const token = signToken(authItem.username)
    const refreshtoken = signRefreshtoken(authItem.username);
    return { result: result, token: token, refreshtoken: refreshtoken };
    // verified: result[0].password == authItem.password,
    // userData: {
    //     id: result[0].id,
    //     name: result[0].name,
    //     email: result[0].email,
    //     phone: result[0].phone
    // }
  }
  async addAuth(authItem) {
    try {
      const authQuery = addAuthQuery();
      const updateQuery = updateEmailUserQuery()
      console.log(authItem);
      // console.log(userQuery+" the params:"+userAndAuthItem.username+" "+ userAndAuthItem.nickname+" "+userAndAuthItem.email+" "+userAndAuthItem.birthday+" "+1)
      //console.log(authQuery+" the params:"+userAndAuthItem.username+ " "+password)
      const password = SHA256(authItem.password).toString(enc.Hex);
      console.log(password);
      const authResult = await executeQuery(authQuery, [
        authItem.username,
        password,
      ]);
      const updateResult = await executeQuery(updateQuery, [
        authItem.email,
        authItem.username
      ]);
      const getUserIdQ = getUserId()
      const userId = await executeQuery(getUserIdQ, [
        authItem.username
      ]);
      const token = signToken(authItem.username)
      const refreshtoken = signRefreshtoken(authItem.username);
      console.log(userId)
      const result = {
        authResult: authResult,
        updateResult: { result: updateResult, id: userId[0] }
      };
      console.log(result);
      return { token: token, refreshtoken: refreshtoken, result: result };
    } catch (ex) {
      console.log("my error \n" + ex);
    }
  }
  async addUserAndAuth(userAndAuthItem) {
    try {
      const userQuery = addUserQuery();
      const authQuery = addAuthQuery();
      console.log(userAndAuthItem);
      // console.log(userQuery+" the params:"+userAndAuthItem.username+" "+ userAndAuthItem.nickname+" "+userAndAuthItem.email+" "+userAndAuthItem.birthday+" "+1)
      //console.log(authQuery+" the params:"+userAndAuthItem.username+ " "+password)
      const password = SHA256(userAndAuthItem.password).toString(enc.Hex);
      console.log(password);
      const userResult = await executeQuery(userQuery, [
        userAndAuthItem.username,
        userAndAuthItem.nickname,
        userAndAuthItem.email,
        userAndAuthItem.birthday,
      ]);
      const authResult = await executeQuery(authQuery, [
        userAndAuthItem.username,
        password,
      ]);
      const token = signToken(userAndAuthItem.username)
      const refreshtoken = signRefreshtoken(userAndAuthItem.username);

      const result = {
        authResult: authResult,
        userResult: userResult,
      };
      console.log(result);
      return { token: token, refreshtoken: refreshtoken, result: result };
    } catch (ex) {
      console.log("my error \n" + ex);
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
