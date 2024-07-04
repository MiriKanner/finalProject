import { executeQuery } from "../dataAccess/db.js";
import { addQuery } from "../queries/genericQueries.js";
import {
  getPasswordQuery,
  updateEmailUserQuery,
  getUserId,
  isChildQuery,
} from "../queries/authQueries.js";
import pkg from "crypto-js";
const { SHA256, enc } = pkg;
import { signToken, signRefreshtoken } from "../middleware/jwt.js";
export class AuthService {
  async verifyUserAuth(authItem) {
    const authQuery = getPasswordQuery();
    const password = SHA256(authItem.password).toString(enc.Hex);
    const result = await executeQuery(authQuery, [authItem.username, password]);
    if (result.length == 0) throw { message: "login failed", errno: 401 };
    const token = signToken(authItem.username);
    const refreshtoken = signRefreshtoken(authItem.username);
    return { result: result, token: token, refreshtoken: refreshtoken };
  }
  async getChildUser(userChildItem) {
    const isChildQ = isChildQuery();
    const result = await executeQuery(isChildQ, [
      userChildItem.username,
      userChildItem.usernameParent,
      userChildItem.birthday,
    ]);
    if (result.length == 0)
      throw { message: "authertaction as child failed", errno: 401 };
    return result;
  }
  async addAuthOnly(authItem) {
    const authQuery = addQuery("auth");
    const password = SHA256(authItem.password).toString(enc.Hex);
    const authResult = await executeQuery(authQuery, [
      authItem.username,
      password,
    ]);
    const token = signToken(authItem.username);
    const refreshtoken = signRefreshtoken(authItem.username);
    return { token: token, refreshtoken: refreshtoken, authResultQ: authResult };
  }
  async addAuth(authItem) {
    try {
      
      // const authQuery = addQuery("auth");
      // const updateQuery = updateEmailUserQuery();
      // const password = SHA256(authItem.password).toString(enc.Hex);

      // const authResult = await executeQuery(authQuery, [
      //   authItem.username,
      //   password,
      // ]);
      const authResult=this.addAuthOnly(authItem)
      const updateResult = await executeQuery(updateQuery, [
        authItem.email,
        authItem.username,
      ]);
      const getUserIdQ = getUserId();
      const userId = await executeQuery(getUserIdQ, [authItem.username]);
      // const token = signToken(authItem.username);
      // const refreshtoken = signRefreshtoken(authItem.username);
      const result = {
        authResult: authResult.authResultQ,
        userResult: { result: updateResult, id: userId[0].id },
      };
      return { token: authResult.token, refreshtoken:  authResult.refreshtoken, result: result };
    } catch (ex) {
      throw ex;
    }
  }
  async addUserAndAuth(userAndAuthItem) {
    try {
      const userQuery = addQuery("users");
      const authQuery = addQuery("auth");
      
      const userResult = await executeQuery(userQuery, [
        userAndAuthItem.username,
        userAndAuthItem.nickname,
        userAndAuthItem.email,
        userAndAuthItem.birthday,
      ]);
      // const password = SHA256(userAndAuthItem.password).toString(enc.Hex);
      // const authResult = await executeQuery(authQuery, [
      //   userAndAuthItem.username,
      //   password,
      // ]);
      // const token = signToken(userAndAuthItem.username);
      // const refreshtoken = signRefreshtoken(userAndAuthItem.username);
      const authResult=this.addAuthOnly(userAndAuthItem)
      const result = {
        authResult: authResult.authResult,
        userResult: userResult,
      };
      return { token:  authResult.token, refreshtoken: authResult. refreshtoken, result: result };
    } catch (ex) {
      throw ex;
    }
  }
}
