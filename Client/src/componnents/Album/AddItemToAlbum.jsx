import React, { useRef, useState, useEffect, useContext } from "react";
import { postReq, getReq, postMediaReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { UserContext } from "../../App";
import { FaBeer } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { IconContext } from "react-icons";
import EmojiPicker from 'emoji-picker-react';

function AddItemToAlbum(props) {
  const user = useContext(UserContext).user;
  let { albumId } = useParams();
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectOption] = useState(null);

  useEffect(() => {
    if (options.length < 1) {
      const req = {
        method: "GET",
        route: `items/itemOptions`,
      };
      let tempOption = [];
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          responseJson.map((itemOption) =>
            tempOption.push({
              label: itemOption.option,
              value: itemOption.optionLabel,
            })
          );
          setOptions(tempOption);
        });
    }
  }, []);

  const onSubmit = (data) => {
    // console.log(selectOption.value == 1 ? file : data.name + "erd");
    const req = {
      method: "POST",
      route: `items/${albumId}`,
      body: {
        creationdate: new Date().toISOString().split("T")[0],
        idtype: selectOption.value,
        data: data.name,
      },
    };

    postReq(req)
      .then((response) => response.json())
      .then((responseJson) => {
        props.setDisplayAddItem(false);
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
    dataForm.append("idtype", selectOption.value);
    dataForm.append("creationdate", new Date().toISOString().split("T")[0]);
    dataForm.append("image", data.image[0]);
    const req = {
      method: "POST",
      route: `items/${albumId}`,
      body: dataForm,
    };
    postMediaReq(req)
      .then((response) => response.json())
      .then((responseJson) => {
        props.setDisplayAddItem(false);
      });
  };
function onEmojiSelect(emj)
{
  let hex = emj.emoji.codePointAt(0).toString(16)
  onSubmit({name:hex});
}
  useEffect(() => {
    // console.log(selectOption);
  }, [selectOption]);
  const [file, setFile] = useState();

  return (
    <>
      <div className="container">
        <label htmlFor="option">What are we adding to the album?</label>
        <Select id="option"
          options={options}
          onChange={(choise) => setSelectOption(choise)} />
      </div>

      {selectOption?.label == "story" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <label htmlFor="name">Enter text</label>
            <input type="text"
              className="form-control"
              id="name"
              placeholder="Enter Story"
              {...register("name")} />
            <small id="emailHelp" class="form-text text-muted">
              example: story, joke.
            </small>
          </div>
          <button type="submit" >
            Submit
          </button>
        </form>
      )}

      {selectOption?.label == "image" && (
        <form onSubmit={handleSubmit(onSubmitPhoto)}
          encType="multipart/form-data">
          <div className="container">
            <label htmlFor="name">Select Image</label>
            <input type="file"
              className="form-control"
              id="image"
              accept="image/*"
              placeholder="Select image"
              {...register("image")} />
          </div>
          <button type="submit" >
            Submit
          </button>
        </form>
      )}

      {selectOption?.label == "icon" && (
        <form onSubmit={handleSubmit(onSubmit)}
          // encType="multipart/form-data"
          >
            <div>
            {/* <FaBeer 
              {...register("image")} 
            /> */}
             <EmojiPicker onEmojiClick={(emj)=>onEmojiSelect(emj)}/>
            </div>
          <button type="submit" >
            Submit
          </button>
        </form>
      )}

      {selectOption?.label == "video" && (
        <form onSubmit={handleSubmit(onSubmitPhoto)}
          encType="multipart/form-data">
          <div className="container">
            <label htmlFor="name">Select Video</label>
            <input type="file"
              className="form-control"
              id="video"
              accept="video/*"
              placeholder="Select video"
              {...register("image")} />
          </div>
          <button type="submit" >
            Submit
          </button>
        </form>
      )}
    </>
  );
}
export default AddItemToAlbum;