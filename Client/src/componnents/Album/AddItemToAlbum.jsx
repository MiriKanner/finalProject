import React, { useRef, useState, useEffect, useContext } from "react";
import { postReq, getReq, postMediaReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Select from 'react-select'
import { UserContext } from "../../App";

function AddItemToAlbum(props) {
    const user = useContext(UserContext).user;
    let { albumId } = useParams();
    const { register, handleSubmit } = useForm();
    const [options, setOptions] = useState([])
    const [selectOption, setSelectOption] = useState(null)
    useEffect(() => {
        if (options.length < 1) {
            const req = {
                method: "GET",
                route: `items/itemOptions`,
            };
            let tempOption = []
            getReq(req).then((response) => response.json()).then((responseJson) => {
                responseJson.map((itemOption) => tempOption.push({ label: itemOption.option, value: itemOption.optionLabel }))
                setOptions(tempOption)
            })
        }
    }, [])

    const onSubmit = (data) => {
        console.log(selectOption.value == 1 ? file : data.name + "erd")
        const req = {
            method: "POST",
            route: `items/${albumId}`,
            body: { creationdate: new Date().toISOString().split('T')[0], idtype: selectOption.value, data: data.name },
        };

        postReq(req).then((response) => response.json())
            .then((responseJson) => {
                props.setDisplayAddItem(false)
                //  console.log(responseJson);
                //    props.setDisplayAddMyChildrenAlbum(false)
                // if (responseJson.length != 0) {
                // } else {
                //     alert("wrong authentication");
                // }
            });
    };
    const onSubmitPhoto = (data) => {
        const dataForm = new FormData();
        dataForm.append('idtype', selectOption.value)
        dataForm.append('creationdate', new Date().toISOString().split('T')[0])
        dataForm.append('image', data.image[0])
        const req = {
            method: "POST",
            route: `items/${albumId}`,
            body: dataForm
        }
        postMediaReq(req).then((response) => response.json())
            .then((responseJson) => {
                props.setDisplayAddItem(false)
            });
    };

    useEffect(() => { console.log(selectOption) }, [selectOption])
    const [file, setFile] = useState();

    const onFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile)
            console.log("not selectedFile")
        setFile(selectedFile);
        console.log(selectedFile)
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(formData)



        const req = {
            method: "POST",
            route: `items/uploads`,
            body: formData,
        };
        postRequ(req)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    };

    async function postRequ(req) {
        let answer;
        await fetch(`http://localhost:8080/${req.route}`, {
            method: req.method,
            body: req.body,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then(response => {
            if (response.ok)
                return response
            else throw new Error
            //console.log(response.headers.getSetCookie());
            // for (let entry of response.headers.entries()) {
            //     console.log('header',entry);
            // }
        }).then(data => {
            answer = data
            //     console.log(data)
        });
        return answer;
    }
    return (
        <>
            <div className="form-group">
                <label htmlFor="option">What are we adding to the album?</label>
                <Select id='option' options={options} onChange={(choise) => setSelectOption(choise)} />
            </div>

            {selectOption?.label == 'story' && <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="name">Enter text</label>
                    <input type="text"
                        className="form-control"
                        id="name"
                        //aria-describedby="emailHelp"
                        placeholder="Enter Story"
                        {...register("name")} />
                    <small id="emailHelp" class="form-text text-muted">
                        example: story, joke.
                    </small>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>}

            {selectOption?.label == 'image' && <form onSubmit={handleSubmit(onSubmitPhoto)} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Select Image</label>
                    <input type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        // onChange={onFileUpload}
                        placeholder="Select image"
                        {...register("image")} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>}



        </>
    )

}
export default AddItemToAlbum;
