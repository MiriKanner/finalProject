import express from "express";
 import { AuthController } from "../controllers/authController.js";
const authRouter = express.Router();

const authController = new AuthController()
authRouter.post("/", authController.verifyUserAuth);
authRouter.post("/signUp", authController.addAuthAndUser);
// authRouter.put("/", authController.updateAuth);
// authRouter.delete("/:userId", authController.deleteAuthAndUser);


export {
    authRouter
}