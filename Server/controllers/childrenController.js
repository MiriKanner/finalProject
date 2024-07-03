import { ChildrenService } from "../service/childrenService.js";
import { newChild, childSchema } from "../serverValidations.js";

export class ChildrenController {
  async getMyChildren(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.getMyChildren(req.params.username);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex })
    }
  }
  async verifyIsChild(req, res, next) {
    try {
      const v = childSchema.validate(req.body);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.verifyIsChild(req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex })
    }
  }
  async addChild(req, res, next) {
    try {
      let v = newChild.validate(req.body.child);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.addChildToParent(req.body.child);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex })
    }
  }
}
