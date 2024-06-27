import React, { useRef, useState, createContext, useContext } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { userLoginSchema } from "../../clientValidations";
import Recaptcha from "react-recaptcha";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";

// function getCookie(tabs) {
//   let getting = browser.cookies.get({
//     url: tabs[0].url,
//     name: "favorite-color",
//   });
//   getting.then(logCookie);
// }

function Login() {
  const captchaRef = useRef(null);
  const site_key = "6LdZZAEqAAAAAHMNpZN8FEN0ECFC4jJlhTpW1iBD";
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [messageText, setMessageText] = useState("");

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    let userToValidate = { username: data.username, password: data.password };
    let v = userLoginSchema.validate(userToValidate);
    if (v.error) {
      setMessageText(v.error.details[0]);
      return;
    }
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();
    const req = {
      method: "POST",
      route: "auth",
      body: userToValidate,
    };
    postReq(req)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.length != 0) {
          Cookies.set(
            "currentUser",
            JSON.stringify({
              username: responseJson[0].username,
              email: responseJson[0].email,
              token: responseJson[0].token,
            })
          );
          // localStorage.setItem(
          //   "currentUser",
          //   JSON.stringify({
          //     username: responseJson[0].username,
          //     email: responseJson[0].email,
          //     token: responseJson[0].token,
          //   })
          // );
          user.setUser(responseJson[0]);
          // console.log(getCookie('token'))
          //cookies.set('token',)
          navigate("/" + responseJson[0].username + "/home");
        } else {
          alert("wrong authentication");
        }
      });
  };
  function callback() {
    console.log("load chapta");
  }
  function verifyCallback(response) {
    if (response) console.log("vertify chapta");
    else console.log("No");
  }
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
          {/* <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small> */}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
        </div>
        <div> {messageText.message}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <Recaptcha
    sitekey="6Lc7If8pAAAAAE2XO4B3ATN3BgJDjrY__ith8Ccn"
    render="explicit"
    onloadCallback={()=>callback}
    // verifyCallback={()=>verifyCallback}
  /> */}
      {/* <reCAPTCHA sitekey='6LdWP_8pAAAAAMYAuj6vaa4kV5ujwNEdEE5XtGyS' /> */}
      <ReCAPTCHA sitekey={site_key} />
      {/* <script src="https://www.google.com/recaptcha/enterprise.js?render=6Leigv0pAAAAAEmy8gP5AjC5ePpxa4CdHAWlUAk7"></script> */}
      <Link to="/signup">don't have acount? please sign up</Link>
      <br/>
      <Link to="/signup/child">child of user? please create auth</Link>
    </>
  );
}

export default Login;
