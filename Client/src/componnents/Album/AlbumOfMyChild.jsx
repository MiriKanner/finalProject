import React, { useRef, useState } from "react";
import fetchRequ from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";


function AlbumOfMyChild() {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const req = {
      method: "POST",
      route: "auth",
      body: { username: data.username, password: data.password },
    };
    fetchRequ(req).then((responseJson) => {
      console.log(responseJson);
      if (responseJson.length != 0) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: responseJson[0].nickname,
            username: responseJson[0].username,
            email: responseJson[0].email,
            token: responseJson[0].token
          })
        );
        user.setUser(responseJson[0]);
       // console.log(getCookie('token'))
        //cookies.set('token',)
        navigate("/home/" + responseJson[0].username);
      } else {
        alert("wrong authentication");
      }
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
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Link to="/signup">don't have acount? please sign up</Link>
    </>
  );
}

export default AlbumOfMyChild;
