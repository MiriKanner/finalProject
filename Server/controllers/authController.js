import { AuthService } from "../service/authService.js";
import cookie from "cookie";
import { addUserSchema, minUserSchema } from "../serverValidations.js";
import NodeMailer from "nodemailer";

export class AuthController {
  // async updateAuth(req, res, next) {
  //     try {
  //         const authService = new AuthService();
  //         const resultItem = await authService.updateAuth(req.body);
  //         res.status(200).json({ status: 200, data: resultItem });
  //     }
  //     catch (ex) {
  //         console.log('Authication error')
  //         const err = {}
  //         switch (ex.message) {
  //             case "Authentication failed":
  //                 err.statusCode = 408;
  //                 break;
  //             default:
  //                 err.statusCode = 500;
  //                 break;
  //         }
  //         err.message = ex;
  //         next(err)
  //     }
  // }
  // async updateAuth(req, res, next) {

  async verifyUserAuth(req, res, next) {
    try {
      const v = minUserSchema.validate(req.body);
      if (v.error) {
        next(v.error);
        return;
      }
      const authService = new AuthService();
      const resultItem = await authService.verifyUserAuth(req.body);
      res
        .status(200)
        .cookie("token", resultItem.token, {
          expires: new Date(Date.now() + 900000) /*, httpOnly: true*/,
        })
        .json(resultItem.result);
    } catch (ex) {
      console.log("Authication error");
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }
  async addAuthAndUser(req, res, next) {
    try {
      const v = addUserSchema.validate(req.body);
      if (v.error) {
        next(v.error);
        return;
      }
      const authService = new AuthService();
      const resultItem = await authService.addUserAndAuth(req.body);

      const transporter = NodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: "joyfuljourneyscapturethejoy@gmail.com",
          pass: "Capture the Joy, Treasure the Journey",
        },
      });

      const mailOptions = {
        from: "joyfuljourneyscapturethejoy@gmail.com",
        to: req.body.email,
        subject: "You are Sigh Up To Joyful Journeys!!",
        text:
          "Hello" + req.body.username + "We wait to see you create your albums",
      };
      console.log("suceesed");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res
        .status(200)
        .cookie("token", resultItem.token, {
          expires: new Date(Date.now() + 900000) /*, httpOnly: true*/,
        })
        .json(resultItem.result);
    } catch (ex) {
      console.log("Authication error");
      const err = {};
      err.statusCode = 500;
      err.message = ex;
      next(err);
    }
  }

  // async deleteAuthAndUser(req, res, next) {

  //     try {
  //         const authService = new AuthService();
  //         const result = await authService.deleteAuthAndUser(req.body);
  //         res.status(200).json({status: 200, data: result});
  //     }
  //     catch (ex) {
  //         console.log('Authication error')
  //         const err = {}
  //         err.statusCode = 500;
  //         err.message = ex;
  //         next(err)
  //     }
  // }
}
