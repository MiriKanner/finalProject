import { executeQuery } from "../dataAccess/db.js";
import { getPasswordQuery, updateEmailUserQuery, getUserId, addQuery } from "../dataAccess/queries.js";
import pkg from "crypto-js";
const { SHA256, enc } = pkg;
import { signToken, signRefreshtoken } from "../middleware/jwt.js";
export class AuthService {
  async verifyUserAuth(authItem) {
    const authQuery = getPasswordQuery();
    const password = SHA256(authItem.password).toString(enc.Hex);
    const result = await executeQuery(authQuery, [authItem.username, password]);
    if (result.length == 0) throw { message: "login failed", errno: 401 };
    const token = signToken(authItem.username)
    const refreshtoken = signRefreshtoken(authItem.username);
    return { result: result, token: token, refreshtoken: refreshtoken };
  }
  async addAuth(authItem) {
    try {
      const authQuery = addQuery('auth');
      const updateQuery = updateEmailUserQuery()
      const password = SHA256(authItem.password).toString(enc.Hex);
      const authResult = await executeQuery(authQuery, [authItem.username, password]);
      const updateResult = await executeQuery(updateQuery, [authItem.email, authItem.username]);
      const getUserIdQ = getUserId()
      const userId = await executeQuery(getUserIdQ, [authItem.username]);
      const token = signToken(authItem.username)
      const refreshtoken = signRefreshtoken(authItem.username);
      const result = {
        authResult: authResult,
        updateResult: { result: updateResult, id: userId[0] }
      };
      return { token: token, refreshtoken: refreshtoken, result: result };
    } catch (ex) {
      throw ex
    }
  }
  async addUserAndAuth(userAndAuthItem) {
    try {
      const userQuery = addQuery('users');
      const authQuery = addQuery('auth');
      const password = SHA256(userAndAuthItem.password).toString(enc.Hex);
      const userResult = await executeQuery(userQuery, [
        userAndAuthItem.username,
        userAndAuthItem.nickname,
        userAndAuthItem.email,
        userAndAuthItem.birthday,
      ]);
      const authResult = await executeQuery(authQuery, [userAndAuthItem.username, password]);
      const token = signToken(userAndAuthItem.username)
      const refreshtoken = signRefreshtoken(userAndAuthItem.username);
      const result = {
        authResult: authResult,
        userResult: userResult,
      };
      return { token: token, refreshtoken: refreshtoken, result: result };
    } catch (ex) {
      throw ex
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
