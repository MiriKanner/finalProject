import NodeMailer from "nodemailer";
import fs from "fs";
import path from "path";

const transporter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "joyfuljourneyscapturethejoy@gmail.com",
    pass: process.env.PASSWORD_MAIL,
  },
});

const __dirname = path.resolve();
const styledEmailContent = fs.readFileSync(path.resolve(__dirname, './template/welcome-template.html'));


export const sendEmail = (mailObj) => {
  const replacedEmailContent = styledEmailContent
  const mailOptions = {
    from: "joyfuljourneyscapturethejoy@gmail.com",
    to: mailObj.email,
    subject: mailObj.subject,
    html: replacedEmailContent,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch {
    console.log("mailer faild");
  }
};

