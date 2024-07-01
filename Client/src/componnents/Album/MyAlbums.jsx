
import React, { useRef, useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import AllAlbums from "./AllAlbums";
import SearchAndSortAlbum from "./SearchAndSortAlbum";
//import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyAlbums(){
  const user = useContext(UserContext).user;
  const [albums, setalbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const notify = (errorCode,errorMessage) =>toast.error(`error code:${errorCode}. error message:${errorMessage}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
   // transition: Slide,
  });
    useState(false);
  useEffect(() => {
    //my albums
      const req = {
        method: "GET",
        route: `album/${user.username}`,
      };
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setOriginalAlbums(responseJson);
          setalbums(responseJson);
          console.log(responseJson);
        })
        .catch((err) =>           notify(err.errorCode,err.errorText)
        );
    }
  , );
 
  

 
  return (
    <>
     <ToastContainer />
        <SearchAndSortAlbum originalAlbums={originalAlbums} setOriginalAlbums={setOriginalAlbums} albums={albums} setalbums={setalbums}/>
      <div
        className="album"
        // style={{ display: "flex", flexDirection: "row" }}
      >
        <AllAlbums albums={albums} />
      </div>
    </>
  );
}
export default MyAlbums;