import NodeMailer from "nodemailer";
const transporter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "joyfuljourneyscapturethejoy@gmail.com",
    pass: process.env.PASSWORD_MAIL,
  },
});

export const sendEmail = (mailObj) => {
  const mailOptions = {
    from: "joyfuljourneyscapturethejoy@gmail.com",
    to: mailObj.email,
    subject: mailObj.subject,
    text:mailObj.emailBody,
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
