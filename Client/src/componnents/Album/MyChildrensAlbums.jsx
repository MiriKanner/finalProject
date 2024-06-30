import React, { useRef, useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import AddMyChildrenAlbum from "./AddMyChildrenAlbum";
import AllAlbums from "./AllAlbums";
import SearchAndSortAlbum from "./SearchAndSortAlbum";
//import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

function MyChildrensAlbums() {
  const user = useContext(UserContext).user;
  const [albums, setalbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const [displayAddMyChildrenalbums, setDisplayAddMyChildrenalbums] =
    useState(false);
  useEffect(() => {
    if (!displayAddMyChildrenalbums) {
      const req = {
        method: "GET",
        route: `album/myChildrenalbum/${user.username}`,
      };
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setOriginalAlbums(responseJson);
          setalbums(responseJson);
          // console.log(responseJson);
        })
        .catch((err) => {});
    }
  }, [displayAddMyChildrenalbums]);
 
  

 
  return (
    <>
         <SearchAndSortAlbum originalAlbums={originalAlbums} setOriginalAlbums={setOriginalAlbums} albums={albums} setalbums={setalbums}/>

      <button
        onClick={() =>
          setDisplayAddMyChildrenalbums(!displayAddMyChildrenalbums)
        }
      >
        Add albums to my child
      </button>
      {displayAddMyChildrenalbums && (
        <AddMyChildrenAlbum
          setDisplayAddMyChildrenalbums={setDisplayAddMyChildrenalbums}
        />
      )}
      <div
        className="album"
        // style={{ display: "flex", flexDirection: "row" }}
      >
        <AllAlbums albums={albums} />
      </div>
    </>
  );
}

export default MyChildrensAlbums;
