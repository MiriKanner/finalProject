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
            let objectForDB = {};
            if (req.body.idtype == 1) {
                for (let [key, value] of Object.entries(req.body)) {
                    objectForDB[key] = value;
                }
                objectForDB['idtype'] = 1
                objectForDB['data'] = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
            } else
                objectForDB = req.body
            const itemsService = new ItemsService();
            const resultItem = await itemsService.addItem(req.params.idAlbum, objectForDB);
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