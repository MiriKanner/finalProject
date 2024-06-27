import { ChildrenService } from "../service/childrenService.js";
import { newChild ,childSchema} from "../serverValidations.js";

export class ChildrenController {
  async getMyChildren(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.getMyChildren(
        req.params.username
      );
      res.status(200).json(resultItem);
    } catch (ex) {
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
  async verifyIsChild(req, res, next) {
    try {
      const v = childSchema.validate(req.body);
      if (v.error) {
        next(v.error);
        return;
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.verifyIsChild(req.body);
     
      res.status(200).json(resultItem);
    } catch (ex) {
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
  async addChild(req, res, next) {
    try {
      console.log(req.body.child);
      let v = newChild.validate(req.body.child);
      if (v.error) {
        next(v.error);
        return;
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.addChildToParent(req.body.child);
      res.status(200).json(resultItem);
    } catch (ex) {
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
}
