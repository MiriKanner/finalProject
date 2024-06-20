import React, { useRef, useState } from "react";
import { postReq } from '../../serverquests'
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import PasswordStrengthBar from 'react-password-strength-bar';

//   let user = useContext(UserContext);
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();
//   const onSubmit = (data) => {
//     let url =
//       "http://localhost:3000/users?username=" +
//       data.username +
//       "&website=" +
//       data.password;
//     fetch(url)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         if (responseJson.length != 0) {
//           localStorage.setItem(
//             "currentUser",
//             JSON.stringify({
//               name: responseJson[0].username,
//               id: responseJson[0].id,
//               email: responseJson[0].email,
//             })
//           );
//           user.setUser(responseJson[0]);
//           navigate("/home/users/" + responseJson[0].id);
//         } else {
//           alert("wrong authentication");
//         }
//       });
//   };

import { userSchema } from '../../validationsSchemas.js'

function SignUp() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const user = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [messageText, setMessageText] = useState("")
  const onSubmit = (data) => {
    let userLocal;
    let user = { username: data.username, password: data.password, nickname: data.nickname, /*birthday: data.birthday, */email: data.email };
    let v = userSchema.validate(user)// ValidateForm('userSchema', user)
    console.log(v)
    if (v.error) {
      setMessageText(v.error.details[0])
      return
    }

    const req = { method: "POST", route: 'auth/signUp', body: user };
    postReq(req)
      .then((responseJson) => {
        // if (responseJson.length != 0) 
        {
          userLocal = {
            username: data.username,
            email: data.email,
          }
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              userLocal
              //token: responseJson[0].token
            })
          );
          user.setUser(userLocal);
          navigate("/" + userLocal.username + "/home");
        }
      }).catch(() => { });
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
          <PasswordStrengthBar password={password} onChangeScore={(score, feedback) => { console.log(score, feedback) }} />

        </div>

        <div className="form-group">
          <label htmlFor="password">Email</label>
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
        <span> {messageText.message}</span>


        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
      <Link to="/login">don't have acount? please log in</Link>
    </>
  );
}

export default SignUp;
