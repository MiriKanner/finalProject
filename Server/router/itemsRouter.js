import express from "express";
import { ItemsController } from "../controllers/itemsController.js";
import upload from "../middleware/multerSetup.js";

const itemsRouter = express.Router();
const itmesController = new ItemsController();

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.filename);
    }
});

// Create the multer instance
const uploads = multer({ storage: storage });


itemsRouter.post('/uploads', uploads.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });
});



//itemsRouter.get('/:idAlbum', itmesController.getAlbumsItems);
itemsRouter.get('/itemoptions', itmesController.getItemOptions);//getting options for adding to album
// itemsRouter.post('/:idAlbum', itmesController.addItem);
itemsRouter.get('/:idAlbum', itmesController.getMyItems)
itemsRouter.post('/:idAlbum', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    console.log(req.body)
    res.json({ message: 'File uploaded successfully!' });
});

export {
    itemsRouter
}