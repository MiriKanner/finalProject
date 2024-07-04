import React, { useRef, useState, useEffect, useContext } from "react";
import { postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { newChild } from '../../clientValidations.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddChild(props) {
    const user = useContext(UserContext).user;
    const [messageText, setMessageText] = useState("")
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        
    }, [])
    const onSubmit = (data) => {
        console.log(user)
        let child = { username: data.username, nickname: data.nickname,birthday:data.birthday,idparent:user.id }
        let v = newChild.validate(child)
        if (v.error) {
            setMessageText(v.error.details[0])
            return
        }
        const req = {
            method: "POST",
            route: `children/`,
            body: child ,
        };
        postReq(req).then((response) => response.json()).then((responseJson) => {
            props.setDisplayAddChild(false)
            }).catch(err=>          notify(err.errorCode,err.errorText)
            )
    };

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
    return(<>
     <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <label htmlFor="username">Enter User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter User Name of Your Child"
                        {...register("username")}
                    />
                   
                </div>
                <div className="container">
                    <label htmlFor="nickname">Nick Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        placeholder="Enter Nick Name of Your Child"
                        {...register("nickname")}
                    />
                </div>
                <div className="container">
                    <label htmlFor="birthday">Birthday</label>
                    <input 
                        type="date"
                        className="form-control"
                        id="birthday"
                        placeholder="Enter Birth Day of your child"
                        {...register("birthday")}
                    />
                </div>
                <div> {messageText.message}</div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
    </>)
}

export default AddChild;