import { ItemsService } from "../service/itemsService.js";
import upload from '../middleware/multerSetup.js'; 

export class ItemsController {

    async getItemOptions(req, res, next) {
        try {
            const itemsService = new ItemsService();
            const resultItem = await itemsService.allItemTypes();
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async getMyItems(req, res, next) {
        try {

            const itmesService = new ItemsService();
            const resultItem = await itmesService.getMyItmes(req.params.idAlbum);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async addItem(req, res, next) {
        try {
            if (req.body.idtype == 1) {
                console.log('mimmmmmulter')
                upload.single('file')
            }
            const itemsService = new ItemsService();
            const resultItem = await itemsService.addItem(req.params.idAlbum, req.body);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}