import React, { useRef, useState } from "react";
import fetchRequ from '../../serverquests'
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
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

function Login() {
  let user = useContext(UserContext);
  const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const req = { method: "POST",route:'auth',body:{username:data.username,password:data.password} };
        fetchRequ(req).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.length != 0) {
            localStorage.setItem(
              "currentUser",
              JSON.stringify({
                name: responseJson[0].username,
                id: responseJson[0].id,
                email: responseJson[0].email,
              })
            );
            user.setUser(responseJson[0]);
            navigate("/home/users/" + responseJson[0].id);
          } else {
            alert("wrong authentication");
          }
        });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="form-group">
        <label for="username">Enter UserName</label>
        <input
          type="text"
          class="form-control"
          id="username"
          //aria-describedby="emailHelp"
          placeholder="Enter User Name"
          {...register("username")}
        />
        {/* <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small> */}
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          {...register("password")}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Login;
