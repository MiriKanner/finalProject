import React, { useRef, useState } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import PasswordStrengthBar from "react-password-strength-bar";
import Cookies from "js-cookie";
import { userSignupSchema } from "../../clientValidations";

function SignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
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
    let v = userSignupSchema.validate(user); // ValidateForm('userSchema', user)
    console.log(v);
    if (v.error) {
      setMessageText(v.error.details[0]);
      return;
    }

    const req = { method: "POST", route: "auth/signUp", body: user };
    postReq(req)
      .then((res) => res.json())
      .then((responseJson) => {
        // if (responseJson.length != 0)
        {
          console.log(responseJson);
          const userLocal = {
            username: data.username,
            email: data.email,
            id: responseJson.result.userResult.insertId,
          };
          Cookies.set("currentUser",
            JSON.stringify({
              username: userLocal.username,
              email: userLocal.email
            })
          );
          Cookies.set("token", responseJson.token)
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
        <div className="form-group">
          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            placeholder="Nickname"
            {...register("nickname")}
          />
        </div>
        <div className="form-group">
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
      <Link to="/login">don't have acount? please log in</Link>
      {/* <Link to="/sighUp">child of user? please create auth</Link> */}
    </>
  );
}

export default SignUp;
