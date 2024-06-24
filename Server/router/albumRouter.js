import express from "express";
import { AlbumController } from "../controllers/albumController.js";
import multer from "multer";
const albumRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './uploads')
    },
    filename: (req, file, next) => {
        next(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage }).single('image')

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