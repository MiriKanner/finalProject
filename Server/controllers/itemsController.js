import { ItemsService } from "../service/itemsService.js";

export class ItemsController {

    async getItemOptions(req, res, next) {
        try {
            const itemsService = new ItemsService();
            const resultItem = await itemsService.allItemTypes();
            res.json(resultItem);
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
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async deleteItem(req, res, next) {
        try {
            // console.log('delete item controller' + req.params.idItem)
            const itmesService = new ItemsService();
            const resultItem = await itmesService.deleteItem(req.params.idItem);
            if (resultItem.affectedRows > 0)
                res.json(resultItem);
            const err = {}
            err.statusCode = 404;
            err.message = "comment not found";
            next(err)
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
            console.log('hiii add item')
            let objectForDB = {};
            if (req.body.idtype == 1 || req.body.idtype == 3) {
                console.log(process.env.PORT)
                for (let [key, value] of Object.entries(req.body)) {
                    objectForDB[key] = value;
                }
                objectForDB['idtype'] = req.body.idtype
                objectForDB['data'] = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`
            } else
                objectForDB = req.body
            const itemsService = new ItemsService();
            const resultItem = await itemsService.addItem(req.params.idAlbum, objectForDB);
            res.json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}