import express from "express";
import { ChildrenController } from "../controllers/childrenController.js";

const childrenRouter = express.Router();
const childrenController = new ChildrenController();

childrenRouter.get('/myChildren/:username', childrenController.getMyChildren);


export {
    childrenRouter
}