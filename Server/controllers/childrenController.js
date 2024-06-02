import { ChildrenService } from "../service/childrenService.js";

export class ChildrenController {

    async getMyChildren(req, res, next) {
        try {
            const childrenService = new ChildrenService();
            const resultItem = await childrenService.getMyChildren(req.params.username);
            res.status(200).json(resultItem );
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}