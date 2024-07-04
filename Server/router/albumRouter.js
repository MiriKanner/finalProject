import express from "express";
import { AlbumController } from "../controllers/albumController.js";
import upload from "../middleware/multerSetup.js";
const albumRouter = express.Router();

const albumController = new AlbumController();
albumRouter.get('/myChildrenAlbum/:username', albumController.getMyChildrenAlbum);
albumRouter.post('/myChildrenAlbum/:username', upload, albumController.addChildsAlbum);
albumRouter.get('/:username',albumController.getMyAlbums)

export {
    albumRouter
}