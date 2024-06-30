import express from "express";
import { ItemsController } from "../controllers/itemsController.js";
import upload from "../middleware/multerSetup.js";
const itemsRouter = express.Router();

const itmesController = new ItemsController();
itemsRouter.get('/itemoptions', itmesController.getItemOptions);//getting options for adding to album
itemsRouter.post('/:idAlbum', upload, itmesController.addItem);
itemsRouter.get('/:idAlbum', itmesController.getMyItems)
itemsRouter.delete('/:idItem',itmesController.deleteItem)

export {
    itemsRouter
}