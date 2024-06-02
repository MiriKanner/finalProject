import React, { useRef, useState, useEffect } from "react";
import fetchRequ from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import AddMyChildrenAlbum from "./AddMyChildrenAlbum";



function MyChildrensAlbums() {
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  const { register, handleSubmit } = useForm();
  const [allAlbums, setAllAlbums] = useState([])
  const [displayAddMyChildrenAlbum,setDisplayAddMyChildrenAlbum]=useState(false);

  useEffect(() => {
    const req = {
      method: "GET",
      route: `album/myChildrenAlbum/${user.username}`
    };
    fetchRequ(req).then((responseJson) => {
      console.log(responseJson);
      setAllAlbums(responseJson)
    });
  }, [])

  return (
    <>
    <button onClick={()=>setDisplayAddMyChildrenAlbum(!displayAddMyChildrenAlbum)}>Add Album to my child</button>
    {displayAddMyChildrenAlbum&&<AddMyChildrenAlbum/>}
     <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {allAlbums.map((item, index) => (
        <Card shadow="sm" key={item.id} isPressable >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.name}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.childName}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
      {/* {allAlbums.map((album, index) => {
        return <><h3>{album.name}</h3>
          <h3>{album.childName}</h3>
        </>
      })} */}
    </>
  );
}


export default MyChildrensAlbums;
