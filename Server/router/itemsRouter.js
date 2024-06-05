import express from "express";
import { ItemsController } from "../controllers/itemsController.js";

const itemsRouter = express.Router();
const itmesController = new ItemsController();

//itemsRouter.get('/:idAlbum', itmesController.getAlbumsItems);
itemsRouter.get('/itemoptions', itmesController.getItemOptions);//getting options for adding to album
itemsRouter.post('/:idAlbum', itmesController.addItem);
itemsRouter.get('/:idAlbum',itmesController.getMyItems)

export {
    itemsRouter
}