import express from "express";
import { ItemsController } from "../controllers/itemsController.js";

const itemsRouter = express.Router();
const itmesController = new ItemsController();

//itemsRouter.get('/:idAlbum', itmesController.getAlbumsItems);

itemsRouter.post('/:idAlbum', itmesController.addItem);

export {
    itemsRouter
}