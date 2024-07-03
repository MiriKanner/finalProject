import { ItemsService } from "../service/itemsService.js";

export class ItemsController {
    async getItemOptions(req, res, next) {
        try {
            const itemsService = new ItemsService();
            const resultItem = await itemsService.allItemTypes();
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }
    async getMyItems(req, res, next) {
        try {
            const itmesService = new ItemsService();
            const resultItem = await itmesService.getMyItmes(req.params.idAlbum);
            res.json(resultItem);
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }
    async deleteItem(req, res, next) {
        try {
            const itmesService = new ItemsService();
            const resultItem = await itmesService.deleteItem(req.params.idItem);
            if (resultItem.affectedRows > 0)
                res.json(resultItem);
            else {
                next({ statusCode: 404, message: "item not found" })
            }
        }
        catch (ex) {
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }

    async addItem(req, res, next) {
        try {
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
            next({ statusCode: ex.errno || 500, message: ex.message || ex })
        }
    }
}