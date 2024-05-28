import express from "express";
 import { AlbumController } from "../controllers/albumController.js";
const albumRouter = express.Router();

const albumController = new AlbumController()
// albumRouter.post("/", albumController.verifyUseralbum);
// albumRouter.post("/signUp", albumController.addalbumAndUser);
albumRouter.get('/myChildrenAlbum/:username',albumController.getMyChildrenAlbum);
// albumRouter.put("/", albumController.updatealbum);
// albumRouter.delete("/:userId", albumController.deletealbumAndUser);


export {
    albumRouter
}