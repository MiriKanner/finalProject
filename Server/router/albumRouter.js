import express from "express";
import { AlbumController } from "../controllers/albumController.js";
const albumRouter = express.Router();
import upload from "../middleware/multerSetup.js";

const albumController = new AlbumController();
albumRouter.get('/myChildrenAlbum/:username', albumController.getMyChildrenAlbum);
albumRouter.post('/myChildrenAlbum/:username', upload, albumController.addChildsAlbum);
albumRouter.get('/:username',albumController.getMyAlbums)
// albumRouter.delete("/:userId", albumController.deletealbum);

export {
    albumRouter
}