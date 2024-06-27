import express from "express";
import { ChildrenController } from "../controllers/childrenController.js";

const childrenRouter = express.Router();
const childrenController = new ChildrenController();

childrenRouter.get('/myChildren/:username', childrenController.getMyChildren);
childrenRouter.post('/', childrenController.addChild);
childrenRouter.get("/isChild",childrenController.verifyIsChild);


export {
    childrenRouter
}