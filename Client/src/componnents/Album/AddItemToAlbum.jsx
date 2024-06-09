import React, { useRef, useState, useEffect, useContext } from "react";
import fetchRequ from "../../serverquests";
import { Form } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import Select from 'react-select'
import { UserContext } from "../../App";

function AddItemToAlbum(props) {
    const user = useContext(UserContext).user;
    let { albumId } = useParams();

    const { register, handleSubmit } = useForm();
    const [options, setOptions] = useState([])
    //const options = []
    const [selectOption, setSelectOption] = useState(null)
    useEffect(() => {
        if (options.length < 1) {
            const req = {
                method: "GET",
                route: `items/itemOptions`,
            };
            let tempOption = []
            fetchRequ(req).then((response) => response.json()).then((responseJson) => {
                responseJson.map((itemOption) => tempOption.push({ label: itemOption.option, value: itemOption.optionLabel }))
                setOptions(tempOption)
            })
        }
    }, [])
    const onSubmit = (data) => {
        console.log(selectOption.value == 1 ? data.name[0] : data.name + "erd")
        const req = {
            method: "POST",
            route: `items/${albumId}`,
            body: { creationdate: new Date().toISOString().split('T')[0], idtype: selectOption.value, data: selectOption.value == 1 ? data.name[0] : data.name },
        };
        fetchRequ(req).then((response) => response.json())
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
    useEffect(() => { console.log(selectOption) }, [selectOption])
    const [file, setfile] = useState();
    const onFileUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
    
        fetch('http://example.com/upload', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
      };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-group">
                    <label htmlFor="option">What are we adding to the album?</label>
                    <Select id='option' options={options} onChange={(choise) => setSelectOption(choise)} />
                </div>
                {selectOption?.label == 'story' && <div className="form-group">
                    <label htmlFor="name">Enter text</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        //aria-describedby="emailHelp"
                        placeholder="Enter Story"
                        {...register("name")}
                    />
                    <small id="emailHelp" class="form-text text-muted">
                        example: story, joke.
                    </small>
                </div>}
                <div className="form-group">
                    <label htmlFor="name">Select Album's Image</label>
                    <input onInput={(event) => { console.log(event.target.files); setfile(URL.createObjectURL(event.target.files[0])) }}
                        accept="image/*"
                        type="file"
                        className="form-control"
                        id="image"
                        //aria-describedby="emailHelp"
                        placeholder="Select image"
                        {...register("name")}
                    />
                    <img src={file} />
                </div>


                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    )

}
export default AddItemToAlbum;
