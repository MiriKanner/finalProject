import { ChildrenService } from "../service/childrenService.js";
import { newChild, childSchema } from "../serverValidations.js";

export class ChildrenController {
  async getMyChildren(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.getMyChildren(
        req.params.username
      );
      res.json(resultItem);
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
        const err = {}
        err.statusCode = 400;
        err.message = v.error.message;
        next(err)
        return
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.verifyIsChild(req.body);

      res.json(resultItem);
    } catch (ex) {
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
  async addChild(req, res, next) {
    try {
      let v = newChild.validate(req.body.child);
      if (v.error) {
        const err = {}
        err.statusCode = 400;
        err.message = v.error.message;
        next(err)
        return
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.addChildToParent(req.body.child);
      res.json(resultItem);
    } catch (ex) {
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
}
