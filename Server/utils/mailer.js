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
  console.log(styledEmailContent)
  const replacedEmailContent = styledEmailContent
  // .replace("${emailBody}", emailBody)
  // .replace("${params}", params)
//.replace("${username}", mailObj.username);
  const mailOptions = {
    from: "joyfuljourneyscapturethejoy@gmail.com",
    to: mailObj.email,
    subject: mailObj.subject,
    // text: mailObj.emailBody,
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

// import otpGenerator from "otp-generator";

// const generateOTP = () => {
//   const OTP = otpGenerator.generate(6, {
//     upperCaseAlphabets: false,
//     specialChars: false,
//     lowerCaseAlphabets: false,
//   });
//   var salt = bcrypt.genSaltSync(10);
//   var hashOtp = bcrypt.hashSync(OTP, salt);
//   return [OTP, hashOtp];
// };
