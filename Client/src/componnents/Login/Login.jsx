import React, { useRef, useState, createContext, useContext } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { userLoginSchema } from "../../clientValidations";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const captchaRef = useRef(null);
  const site_key = "6LdZZAEqAAAAAHMNpZN8FEN0ECFC4jJlhTpW1iBD";
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [messageText, setMessageText] = useState("");
  const notify = (errorCode,errorMessage) =>toast.error(`error code:${errorCode}. error message:${errorMessage}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
   // transition: Slide,
  });
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
          Cookies.set("currentUser",
            JSON.stringify({
              username: responseJson.result.username,
              email: responseJson.result.email,
              id:responseJson.result.id
            })
          );
          Cookies.set("token", responseJson.token)
          user.setUser(responseJson.result);
          console.log(responseJson.result)
          navigate("/" + responseJson.result.username + "/home");
        } else {
          alert("wrong authentication");
        }
      }).catch(err=> notify(err.errorCode,err.errorText)
      )
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
     <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container">
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
        <div className="container">
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
      <Link to="/signup">don't have acount? please sign up</Link>
      <br />
      <Link to="/signup/child">child of user? please create auth</Link>
    </>
  );
}

export default Login;
