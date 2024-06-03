import React, { useRef, useState, useEffect } from "react";
import fetchRequ from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
 import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import AddMyChildrenAlbum from "./AddMyChildrenAlbum";

//import { CardGroup, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'

function MyChildrensAlbums() {
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  const { register, handleSubmit } = useForm();
  const [allAlbums, setAllAlbums] = useState([])
  const [displayAddMyChildrenAlbum, setDisplayAddMyChildrenAlbum] = useState(false);

  useEffect(() => {
    const req = {
      method: "GET",
      route: `album/myChildrenAlbum/${user.username}`
    };
    fetchRequ(req).then((response)=>response.json())
    .then((responseJson) => {
      setAllAlbums(responseJson)
      console.log(responseJson);
    }).catch(err => { })

  }, [])

  return (
    <>
      <button onClick={() => setDisplayAddMyChildrenAlbum(!displayAddMyChildrenAlbum)}>Add Album to my child</button>
      {displayAddMyChildrenAlbum && <AddMyChildrenAlbum />}
       <div className="gap-2 grid grid-cols-2 sm:grid-cols-4" style={{display: 'flex', flexDirection: 'row'}}>
        {allAlbums.map((item, index) => (
          <div>
            <Card onClick={() => navigate(`./${item.albumId}`)}
              shadow="sm" key={item.id} isPressable style={{flex: 1}}>
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
                <b>{item.name}</b>
                <p className="text-default-500">{item.childName}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div > 
      {/* {allAlbums.map((album, index) => {
        return <><h3>{album.name}</h3>
          <h3>{album.childName}</h3>
        </>
      })} */}


{/* 
      <CardGroup>
        {allAlbums.map((album, index) => (
          <Card onClick={() => navigate(`./${album.albumId}`)}>
            <CardImg
              alt="Card image cap"
              src={album.img}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                {album.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {album.img}
              </CardSubtitle>
              <Button>Show more</Button>
            </CardBody>
          </Card>))}
      </CardGroup> */}
    </>
  );
}


export default MyChildrensAlbums;
