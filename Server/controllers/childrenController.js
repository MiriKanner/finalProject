import { ChildrenService } from "../service/childrenService.js";

export class ChildrenController {
  async getMyChildren(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.getMyChildren(req.params.username,req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex })
    }
  }
  /*
  async verifyIsChild(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.verifyIsChild(req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex })
    }
  }*/
  async addChild(req, res, next) {
    try {
      const childrenService = new ChildrenService();
      const resultItem = await childrenService.addChildToParent(req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex })
    }
  }
}
