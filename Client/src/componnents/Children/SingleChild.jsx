import { useParams } from "react-router-dom";
import { getReq } from "../../serverquests";
import React, { useState, useEffect } from "react";
import AllAlbums from "../Album/AllAlbums";
import SearchAndSortAlbum from "../Album/SearchAndSortAlbum";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SingleChild() {
  const params = useParams()
  const childUserName = params.childName;
  const [albums, setalbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
  
  useEffect(() => {
    const req = { route: `album/${childUserName}` };
    getReq(req)
      .then((response) => response.json())
      .then((responseJson) => {
        setOriginalAlbums(responseJson);
        setalbums(responseJson);
      })
      .catch((err) => notify(err.errorCode, err.errorText));
  }, []);

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

  return (
    <>
      <ToastContainer />
      <SearchAndSortAlbum originalAlbums={originalAlbums} setOriginalAlbums={setOriginalAlbums} albums={albums} setalbums={setalbums} />
      <div className="album"      >
        <AllAlbums albums={albums} />
      </div>
    </>
  );
}
export default SingleChild;;
