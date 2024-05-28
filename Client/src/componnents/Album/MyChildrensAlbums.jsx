import React, { useRef, useState, useEffect } from "react";
import fetchRequ from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { createContext, useContext } from "react";
import { UserContext } from "../../App";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";



function MyChildrensAlbums() {
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  const { register, handleSubmit } = useForm();
  const [allAlbums, setAllAlbums] = useState([])

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
/*import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function App() {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}*/

export default MyChildrensAlbums;
