import React, { useState, useContext } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { userLoginSchema } from "../../clientValidations";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [messageText, setMessageText] = useState("");

  const notify = (errorCode, errorMessage) => toast.error(`error code:${errorCode}. error message:${errorMessage}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const onSubmit = (data) => {
    let userToValidate = { username: data.username, password: data.password };
    let valid = userLoginSchema.validate(userToValidate);
    if (valid.error) {
      setMessageText(valid.error.details[0]);
      return;
    }
    const req = { route: "auth", body: userToValidate };
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
              id: responseJson.result.id
            })
          );
          user.setUser(responseJson.result);
          navigate("/" + responseJson.result.username + "/home");
        } else {
          alert("wrong authentication");
        }
      }).catch(err => notify(err.errorCode, err.errorText)
      )
  };

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
            placeholder="Enter User Name"
            {...register("username")}
          />
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
      <Link to="/signup/child">child of user? complete your account</Link>
    </>
  );
}

export default Login;