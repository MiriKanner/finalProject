import React, { useRef, useState } from "react";
import { getReq, postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import PasswordStrengthBar from "react-password-strength-bar";
import { childSignupSchema, childSchema } from "../../clientValidations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";


function SignUpChild() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const userCo = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [messageText, setMessageText] = useState("");
  const [correctUser, setCorrectUser] = useState(undefined);
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
  const onSubmitIsUser = (data) => {
    let child = {
      username: data.username,
      birthday: data.birthday,
      usernameParent: data.usernameParent,
    };

    let v = childSchema.validate(child);
    if (v.error) {
      setMessageText(v.error.details[0]);
      return;
    }
    const req = { method: "POST", route: "auth/isChild", body: child };
    postReq(req)
      .then((response) => response.json())
      .then((responseJson) => {
        setCorrectUser(responseJson[0]);
      })
      .catch(err => notify(err.errorCode, err.errorText)
      );
  };

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
    postReq(req).then((response) => response.json())
      .then((responseJson) => {
        // if (responseJson.length != 0)
        console.log(responseJson.result.userResult)
        const userLocal = {
          username: data.username,
          email: data.email,
          id: responseJson.result.userResult.id,
        };
        Cookies.set("currentUser", JSON.stringify(userLocal));
        Cookies.set("token", responseJson.token)
        userCo.setUser(userLocal);
        navigate("/" + userLocal.username + "/home");
      }).catch((err) => {
        notify(err.errorCode, err.errorText)
      });
  };

  return (
    <> <ToastContainer />
      {!correctUser && (
        <form onSubmit={handleSubmit(onSubmitIsUser)}>
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
          <div>
            <label htmlFor="birthday">Enter Birth Day</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              placeholder="Enter Birth Day"
              {...register("birthday")}
            />
          </div>
          <div>
            <label htmlFor="parentUserName">Enter Parent User Name</label>
            <input
              type="text"
              className="form-control"
              id="parentUserName"
              placeholder="Enter Parent User Name"
              {...register("usernameParent")}
            />
          </div>
          <div> {messageText.message}</div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
      {correctUser && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(event) => { setInputValue(event.target.value) }}
              {...register("password")} />
            <PasswordStrengthBar
              password={password}
              onChangeScore={(score, feedback) => { console.log(score, feedback) }}
            />
          </div>

          <div className="container">
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
      )}
      <Link to="/login">don't have acount? please log in</Link>
    </>
  );
}

export default SignUpChild;
