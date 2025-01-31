import React, { useState, useEffect, useContext } from "react";
import { getReq, postMediaReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import Select from 'react-select'
import { UserContext } from "../../App";
import { newAlbum } from '../../clientValidations.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMyChildrenAlbum(props) {
    const user = useContext(UserContext).user;
    const [messageText, setMessageText] = useState("")
    const { register, handleSubmit } = useForm();
    const [options, setOptions] = useState([])
    const [selectChild, setSelectChild] = useState(null)

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

    useEffect(() => {
        if (options.length < 1) {
            const req = { route: `children/myChildren/${user.username}` };
            let tempOption = []
            getReq(req).then((response) => response.json()).then((responseJson) => {
                responseJson.map((childItem) => tempOption.push({ label: childItem.nickname, value: childItem.childName }))
                setOptions(tempOption)
            }).catch((err) => notify(err.errorCode, err.errorText))
        }
    }, [])

    const onSubmit = (data) => {
        if (selectChild.value) {
            const dataForm = new FormData();
            dataForm.append('name', data.name)
            dataForm.append('childUserName', selectChild.value)
            dataForm.append('image', data.image[0])

            const formDataObject = {};
            dataForm.forEach((value, key) => {
                formDataObject[key] = value;
            });

            let valid = newAlbum.validate(formDataObject)
            if (valid.error) {
                setMessageText(valid.error.details[0])
                return
            }
            dataForm.append('creationdate', new Date().toISOString().split('T')[0])
            const req = {
                route: `album/myChildrenAlbum/${user.username}`,
                body: dataForm
            };
            postMediaReq(req).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson);
                props.setDisplayAddMyChildrenalbums(false)
            }).catch(err => notify(err.errorCode, err.errorText))
        }
    };
    
    return (
        <> <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="container">
                    <label htmlFor="name">Enter Name</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Name of Album"
                        {...register("name")} />
                    <small id="emailHelp" class="form-text text-muted">
                        By example: My Birth, First Birthday.
                    </small>
                </div>
                <div className="container">
                    <label htmlFor="child">To My Child</label>
                    <Select id='child' options={options} onChange={(choise) => setSelectChild(choise)} />
                </div>
                <div className="container">
                    <label htmlFor="name">Select Album's Image</label>
                    <input
                        accept="image/*"
                        type="file"
                        className="form-control"
                        id="image"
                        placeholder="Select image"
                        {...register("image")}
                    />
                </div>
                <div> {messageText.message}</div>
                <button type="submit" >
                    Submit
                </button>
            </form>
        </>
    )
}

export default AddMyChildrenAlbum;