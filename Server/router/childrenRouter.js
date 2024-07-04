import express from "express";
import { ChildrenController } from "../controllers/childrenController.js";
import { validate } from "../middleware/joiValidation.js";
import { newChild } from "../utils/serverValidations.js";
const childrenRouter = express.Router();

const childrenController = new ChildrenController();
childrenRouter.get('/myChildren/:username', childrenController.getMyChildren);
childrenRouter.post('/', validate(newChild), childrenController.addChild);
//import { childSchema } from "../utils/serverValidations.js";
// childrenRouter.get('/isChild', validate(childSchema), childrenController.verifyIsChild);

export {
    childrenRouter
}