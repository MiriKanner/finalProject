import React, { useRef, useState } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import PasswordStrengthBar from "react-password-strength-bar";
import { childSignupSchema } from "../../clientValidations";
import Cookies from 'js-cookie'
function SignUpChild() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const userCo = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [messageText, setMessageText] = useState("");
  const onSubmit = (data) => {
    let user = {
      username: data.username,
      password: data.password,
      email: data.email,
    };
    let v = childSignupSchema.validate(user); // ValidateForm('userSchema', user)
    console.log(v);
    if (v.error) {
      setMessageText(v.error.details[0]);
      return;
    }

    const req = { method: "POST", route: "auth/signUpChild", body: user };
    postReq(req)
      .then((responseJson) => {
        // if (responseJson.length != 0)
        {
          const userLocal = {
            username: data.username,
            email: data.email,
          };
          // var nodemailer = require("nodemailer");

          // var transporter = nodemailer.createTransport({
          //   service: "gmail",
          //   auth: {
          //     user: "youremail@gmail.com",
          //     pass: "yourpassword",
          //   },
          // });

          // var mailOptions = {
          //   from: "youremail@gmail.com",
          //   to: "myfriend@yahoo.com",
          //   subject: "Sending Email using Node.js",
          //   text: "That was easy!",
          // };

          // transporter.sendMail(mailOptions, function (error, info) {
          //   if (error) {
          //     console.log(error);
          //   } else {
          //     console.log("Email sent: " + info.response);
          //   }
          // });
          Cookies.set('currentUser', JSON.stringify({
            userLocal
            //token: responseJson[0].token
          })   
        )
          //   localStorage.setItem(
          //   "currentUser",
          //   JSON.stringify({
          //     userLocal,
          //     //token: responseJson[0].token
          //   })
          // );
          userCo.setUser(userLocal);
          navigate("/" + userLocal.username + "/home");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Enter UserName</label>
          <input
            type="text"
            className="form-control"
            id="username"
            //aria-describedby="emailHelp"
            placeholder="Enter User Name"
            {...register("username")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            //value={password}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            {...register("password")}
          />
          <PasswordStrengthBar
            password={password}
            onChangeScore={(score, feedback) => {
              console.log(score, feedback);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
        </div>
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
        <div> {messageText.message}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login">don't have acount? please log in</Link>

    </>
  );
}

export default SignUpChild;
