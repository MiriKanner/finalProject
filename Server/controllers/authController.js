import { AuthService } from "../service/authService.js";
import { addUserSchema, minUserSchema, addAuthScema, childSchema } from "../serverValidations.js";
import { sendEmail } from "../utils/mailer.js";
export class AuthController {
  async verifyUserAuth(req, res, next) {
    try {
      const v = minUserSchema.validate(req.body);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const authService = new AuthService();
      const resultItem = await authService.verifyUserAuth(req.body);
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false})
      res.json({ result: resultItem.result[0]})
    }
    catch (ex) {
      next({ statusCode: ex.errno || 500, message: ex.message || ex });
    }
  }
  async addAuth(req, res, next) {
    try {
      const v = addAuthScema.validate(req.body);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const authService = new AuthService();
      const resultItem = await authService.addAuth(req.body);
      const emailSent = { email: req.body.email, emailBody: "Welcome", subject: `Hello ${req.body.username}` ,username: req.body.username}
      sendEmail(emailSent)
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false})
      res.json({ result: resultItem.result})
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }

  async addAuthAndUser(req, res, next) {
    try {
      const v = addUserSchema.validate(req.body);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const authService = new AuthService();
      const resultItem = await authService.addUserAndAuth(req.body);
      const emailSent = { email: req.body.email, emailBody: "Welcome", subject: `Hello ${req.body.username}` ,username: req.body.username}
      sendEmail(emailSent)
      res.cookie('jwt', resultItem.token, { httpOnly: true, secure: false})
      res.json({ result: resultItem.result})
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }
  async getChildUser(req, res, next) {
    try {
      console.log(req.body)
      const v = childSchema.validate(req.body);
      if (v.error) {
        next({ statusCode: 400, message: v.error.message })
        return
      }
      const authService = new AuthService();
      const resultItem = await authService.getChildUser(req.body);
      res.json(resultItem);
    } catch (ex) {
      next({ statusCode: ex.errno == 1062 ? 409 : 500, message: ex.message || ex });
    }
  }
}
