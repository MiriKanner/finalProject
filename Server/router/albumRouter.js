import express from "express";
import { AlbumController } from "../controllers/albumController.js";
const albumRouter = express.Router();
import upload from "../middleware/multerSetup.js";

const albumController = new AlbumController()
// albumRouter.post("/", albumController.verifyUseralbum);
// albumRouter.post("/signUp", albumController.addalbumAndUser);
albumRouter.get('/myChildrenAlbum/:username', albumController.getMyChildrenAlbum);
albumRouter.post('/myChildrenAlbum/:username', upload, albumController.addChildsAlbum);
// albumRouter.put("/", albumController.updatealbum);
// albumRouter.delete("/:userId", albumController.deletealbumAndUser);


export {
    albumRouter
}