import { executeQuery } from "../dataAccess/db.js";
import pkg from "crypto-js";
import {
  getPasswordQuery,
  addUserQuery,
  addAuthQuery,
  updateEmailUserQuery,
} from "../dataAccess/queries.js";
const { SHA256, enc } = pkg;
import jwt from "jsonwebtoken";

export class AuthService {
  async verifyUserAuth(authItem) {
    const authQuery = getPasswordQuery();
    const updateEmailQuery=updateEmailUserQuery()
    const password = SHA256(authItem.password).toString(enc.Hex);
    const result1 = await executeQuery(updateEmailQuery, [authItem.username, authItem.email]);
    const result = await executeQuery(authQuery, [authItem.username, password]);
    console.log(result);
    if (result.length == 0) throw new Error();
    const token = jwt.sign({ id: authItem.username }, "privateKey", {
      expiresIn: "20m",
    });
    const refreshtoken = jwt.sign({ id: authItem.username }, "keyrefresh", {
      expiresIn: "1d",
    });
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
      const updateQuery=updateEmailUserQuery()
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
        authItem.username,
        authItem.email,
      ]);
      const token = jwt.sign({ id: authItem.username }, "privateKey", {
        expiresIn: "20m",
      });
      const refreshtoken = jwt.sign(
        { id: authItem.username },
        "keyrefresh",
        { expiresIn: "1d" }
      );

      const result = {
        authResult: authResult,
        updateResult:updateResult
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
      const token = jwt.sign({ id: userAndAuthItem.username }, "privateKey", {
        expiresIn: "20m",
      });
      const refreshtoken = jwt.sign(
        { id: userAndAuthItem.username },
        "keyrefresh",
        { expiresIn: "1d" }
      );

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
