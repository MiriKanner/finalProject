import express from "express";
import { ChildrenController } from "../controllers/childrenController.js";
import { validate } from "../middleware/joiValidation.js";
import { childSchema, newChild } from "../utils/serverValidations.js";
const childrenRouter = express.Router();

const childrenController = new ChildrenController();
childrenRouter.get('/myChildren/:username', childrenController.getMyChildren);
childrenRouter.post('/', validate(newChild), childrenController.addChild);
// childrenRouter.get('/isChild', validate(childSchema), childrenController.verifyIsChild);

export {
    childrenRouter
}