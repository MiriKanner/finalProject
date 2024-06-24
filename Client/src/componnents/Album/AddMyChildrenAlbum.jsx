import React, { useState, useEffect, useContext } from "react";
import { getReq, postMediaReq } from "../../serverquests";
//import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { UserContext } from "../../App";
import { newAlbum } from '../../clientValidations.js'

function AddMyChildrenAlbum(props) {
    const user = useContext(UserContext).user;
    const [messageText, setMessageText] = useState("")
    const { register, handleSubmit } = useForm();
    const [options, setOptions] = useState([])
    //const options = []
    const [selectChild, setSelectChild] = useState(null)
    useEffect(() => {
        if (options.length < 1) {
            const req = {
                method: "GET",
                route: `children/myChildren/${user.username}`,
            };
            let tempOption = []
            getReq(req).then((response) => response.json()).then((responseJson) => {
                responseJson.map((childItem) => tempOption.push({ label: childItem.nickname, value: childItem.childName }))
                setOptions(tempOption)
            })
            console.log(options)
        }
    }, [])
    const onSubmit = (data) => {
        //need to check if selectChild.value is not null.
        // if it is null -   dataForm.append takes "undefined" and passes validation
        // it is a problem
        const dataForm = new FormData();
        dataForm.append('name', data.name)
        dataForm.append('childUserName', selectChild.value)
        dataForm.append('image', data.image[0])

        const formDataObject = {};
        dataForm.forEach((value, key) => {
            formDataObject[key] = value;
          });

        let v = newAlbum.validate(formDataObject)
        if (v.error) {
            setMessageText(v.error.details[0])
            return
        }

        //does not need to be in client validation
        dataForm.append('creationdate', new Date().toISOString().split('T')[0])
        const req = {
            method: "POST",
            route: `album/myChildrenAlbum/${user.username}`,
            body: dataForm//{ ...album, creationdate: new Date().toISOString().split('T')[0] },
        };
        postMediaReq(req).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
            props.setDisplayAddMyChildrenalbums(false)
            // if (responseJson.length != 0) {
            // } else {
            //     alert("wrong authentication");
            // }
        });
    };



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                    <Select id='child' options={options} onChange={(choise) => setSelectChild(choise)} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Select Album's Image</label>
                    <input //onInput={(event) => console.log(URL.createObjectURL(event.target.files[0]))}
                        accept="image/*"
                        type="file"
                        className="form-control"
                        id="image"
                        //aria-describedby="emailHelp"
                        placeholder="Select image"
                        {...register("image")}
                    />
                </div>
                <div> {messageText.message}</div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )

}
export default AddMyChildrenAlbum;