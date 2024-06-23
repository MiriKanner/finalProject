import React, { useRef, useState, useEffect, useContext } from "react";
import { getReq, postReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { newChild } from '../../clientValidations.js'
function AddChild(props) {
    const user = useContext(UserContext).user;
    const [messageText, setMessageText] = useState("")
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        
    }, [])
    const onSubmit = (data) => {
        let child = { username: data.username, nickname: data.nickname,birthday:data.birthday,idparent:user.id }
        let v = newChild.validate(child)
        if (v.error) {
            setMessageText(v.error.details[0])
            return
        }
        const req = {
            method: "POST",
            route: `children/`,
            body: { child },
        };
        postReq(req).then((response) => response.json()).then((responseJson) => {
            props.setDisplayAddChild(false)
            });
    };


    return(<>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="username">Enter User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter User Name of Your Child"
                        {...register("username")}
                    />
                   
                </div>
                <div className="form-group">
                    <label htmlFor="nickname">Nick Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nickname"
                        placeholder="Enter Nick Name of Your Child"
                        {...register("nickname")}
                    />
                </div>
                <div className="form-group">
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