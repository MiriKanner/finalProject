import React, { useState } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import Cookies from "js-cookie";
import { userSignupSchema } from "../../clientValidations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate();
  const userCo = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [messageText, setMessageText] = useState("");

  const onSubmit = (data) => {
    let user = {
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      birthday: data.birthday,
      email: data.email,
    };
    let valid = userSignupSchema.validate(user);
    if (valid.error) {
      setMessageText(valid.error.details[0]);
      return;
    }

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

    const req = { route: "auth/signUp", body: user };
    postReq(req)
      .then((res) => res.json())
      .then((responseJson) => {
        console.log(responseJson);
        const userLocal = {
          username: data.username,
          email: data.email,
          id: responseJson.result.userResult.insertId,
        };
        Cookies.set("currentUser", JSON.stringify(userLocal));
        userCo.setUser(userLocal);
        navigate("/" + userLocal.username + "/home");
      })
      .catch((err) => {
        notify(err.errorCode, err.errorText)
      });
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
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            {...register("password")}
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
        <div className="container">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            placeholder="Nickname"
            {...register("nickname")}
          />
        </div>
        <div className="container">
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            placeholder="Birthday"
            {...register("birthday")}
          />
        </div>
        <div> {messageText.message}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/login">have acount? please log in</Link>
    </>
  );
}

export default SignUp;
