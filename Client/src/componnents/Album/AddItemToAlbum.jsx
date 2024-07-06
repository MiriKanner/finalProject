import React, { useState, useEffect, useContext } from "react";
import { postReq, getReq, postMediaReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Select from "react-select";
import EmojiPicker from 'emoji-picker-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddItemToAlbum(props) {
  let { albumId } = useParams();
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([]);
  const [selectOption, setSelectOption] = useState(null);

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
      const req = { route: `items/itemOptions` };
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
        })
    }
  }, []);

  const onSubmit = (data) => {
    const req = {
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
      }).catch(err => notify(err.errorCode, err.errorText))
  };

  const onSubmitMedia = (data) => {
    const dataForm = new FormData();
    dataForm.append("idtype", selectOption.value);
    dataForm.append("creationdate", new Date().toISOString().split("T")[0]);
    dataForm.append("image", data.image[0]);
    const req = {
      route: `items/${albumId}`,
      body: dataForm,
    };
    postMediaReq(req)
      .then((response) => response.json())
      .then((responseJson) => {
        props.setDisplayAddItem(false);
      }).catch(err => notify(err.errorCode, err.errorText))
  };

  function onEmojiSelect(emj) {
    let hex = emj.emoji.codePointAt(0).toString(16)
    onSubmit({ name: hex });
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <label htmlFor="option">What are we adding to the album?</label>
        <Select id="option"
          options={options}
          styles={{
            control: (provided) => ({
              ...provided,
              boxShadow: "none",
              border: "none",
              color: "#000",
              width: "100%"
            })
          }}
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
        <form onSubmit={handleSubmit(onSubmitMedia)}
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
        <form onSubmit={handleSubmit(onSubmit)}        >
          <div>
            <EmojiPicker onEmojiClick={(emj) => onEmojiSelect(emj)} />
          </div>
          <button type="submit" >
            Submit
          </button>
        </form>
      )}
      
      {selectOption?.label == "video" && (
        <form onSubmit={handleSubmit(onSubmitMedia)}
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