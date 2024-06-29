
import React, { useRef, useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import AllAlbums from "./AllAlbums";
import SearchAndSortAlbum from "./SearchAndSortAlbum";
//import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

function MyAlbums(){
  const user = useContext(UserContext).user;
  const [albums, setalbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
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
        .catch((err) => {});
    }
  , );
 
  

 
  return (
    <>
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