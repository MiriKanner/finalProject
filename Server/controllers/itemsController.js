import { ItemsService } from "../service/itemsService.js";

export class ItemsController {

    async getMyitmes(req, res, next) {
        // try {
        //     const itmesService = new itmesService();
        //     const resultItem = await itmesService.getMyitmes(req.params.username);
        //     res.status(200).json(resultItem );
        // }
        // catch (ex) {
        //     const err = {}
        //     err.statusCode = 500;
        //     err.message = ex;
        //     next(err)
        // }
    }
    async addItem(req,res,next)
    {
        try {
            const itemsService = new ItemsService();
            const resultItem = await itemsService.addItem(req.body);
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