import React, { useRef, useState, useEffect, useContext } from "react";
import fetchRequ from "../../serverquests";
import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { UserContext } from "../../App";

function AddMyChildrenAlbum() {
    const user = useContext(UserContext).user;

    const { register, handleSubmit } = useForm();
    const [options,setOptions]=useState([])
    //const options = []
    useEffect(() => {
        if (options.length<1) {
            const req = {
                method: "GET",
                route: `children/myChildren/${user.username}`,
            };
            let tempOption=[]
            fetchRequ(req).then((responseJson) => {
                responseJson.map((childItem) => tempOption.push({ label: childItem.nickname, value: childItem.childName }))
                setOptions(tempOption)
            })
        }
    },[])
    const onSubmit = (data) => {
        const req = {
            method: "POST",
            route: "auth",
            body: { name: data.name, childUserName: data.childUserName, creationdate: Date().now() },
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
                navigate("/" + responseJson[0].username + "/home");
            } else {
                alert("wrong authentication");
            }
        });
    };



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Enter Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        //aria-describedby="emailHelp"
                        placeholder="Enter Name of Album"
                        {...register("name")}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                        By example: My Birth, First Birthday.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="child">To My Child</label>
                    <Select id='child' options={options} {...register('childUserName')} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Select Album's Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        //aria-describedby="emailHelp"
                        placeholder="Select image"
                        {...register("image")}
                    />
                </div>


                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )

}
export default AddMyChildrenAlbum;
