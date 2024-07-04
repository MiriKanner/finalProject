import express from "express";
import { AuthController } from "../controllers/authController.js";
import { minUserSchema, addAuthScema, addUserSchema, childSchema } from "../utils/serverValidations.js";
import { validate } from "../middleware/joiValidation.js";
const authRouter = express.Router();

const authController = new AuthController()
authRouter.post("/", validate(minUserSchema), authController.verifyUserAuth);
authRouter.post("/signUp", validate(addUserSchema), authController.addAuthAndUser);
authRouter.post("/signUpChild", validate(addAuthScema), authController.addAuth);
authRouter.post("/isChild", validate(childSchema), authController.getChildUser);

// authRouter.put("/", authController.updateAuth);
// authRouter.delete("/:userId", authController.deleteAuthAndUser);

export {
    authRouter
}