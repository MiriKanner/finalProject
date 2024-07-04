import { AuthService } from "../service/authService.js";
import { sendEmail } from "../utils/mailer.js";

export class AuthController {

  async verifyUserAuth(req, res, next) {
    try {
      const authService = new AuthService();
      const resultItem = await authService.verifyUserAuth(req.body);
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false }).json({ result: resultItem.result[0] })
    }
    catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex });
    }
  }

  async addAuth(req, res, next) {
    try {
      const authService = new AuthService();
      const resultItem = await authService.addAuth(req.body);
      const emailSent = { email: req.body.email, subject: `Hello ${req.body.username}` }
      sendEmail(emailSent)
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false }).json({ result: resultItem.result })
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }

  async addAuthAndUser(req, res, next) {
    try {
      const authService = new AuthService();
      const resultItem = await authService.addUserAndAuth(req.body);
      const emailSent = { email: req.body.email, subject: `Hello ${req.body.username}` }
      sendEmail(emailSent)
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false }).json({ result: resultItem.result })
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }

  async getChildUser(req, res, next) {
    try {
      const authService = new AuthService();
      const resultItem = await authService.getChildUser(req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }
}
