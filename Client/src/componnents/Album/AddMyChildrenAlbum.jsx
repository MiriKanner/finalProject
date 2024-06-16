import React, { useRef, useState, useEffect, useContext } from "react";
import {getReq,postReq} from "../../serverquests";
import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { UserContext } from "../../App";

function AddMyChildrenAlbum(props) {
    const user = useContext(UserContext).user;

    const { register, handleSubmit } = useForm();
    const [options,setOptions]=useState([])
    //const options = []
    const [selectChild,setSelectChild]=useState('')
    useEffect(() => {
        if (options.length<1) {
            const req = {
                method: "GET",
                route: `children/myChildren/${user.username}`,
            };
            let tempOption=[]
            getReq(req).then((response)=>response.json()).then((responseJson) => {
                responseJson.map((childItem) => tempOption.push({ label: childItem.nickname, value: childItem.childName }))
                setOptions(tempOption)
            })
            console.log(options)
        }
    },[])
    const onSubmit = (data) => {
      //  console.log( data.image)
        const req = {
            method: "POST",
            route: `album/myChildrenAlbum/${user.username}`,
            body: { name: data.name, childUserName: selectChild.value, creationdate:new Date().toISOString().split('T')[0] },
        };
        postReq(req).then((response)=>response.json()).then((responseJson) => {
            console.log(responseJson);
            props.setDisplayAddMyChildrenAlbum(false)
            // if (responseJson.length != 0) {
               
               
               
            // } else {
            //     alert("wrong authentication");
            // }
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
                    <Select id='child' options={options}  onChange={(choise)=>setSelectChild(choise)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Select Album's Image</label>
                    <input onInput={(event)=> console.log(URL.createObjectURL(event.target.files[0]))}
                         accept="image/*"
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
