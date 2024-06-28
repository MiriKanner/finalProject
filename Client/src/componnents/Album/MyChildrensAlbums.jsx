import React, { useRef, useState, useEffect } from "react";
import { getReq } from "../../serverquests";
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
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const [album, setalbums] = useState([]);

  const [searchType, setSearchType] = useState();

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
          console.log(responseJson)
        })
        .catch((err) => { });
    }
  }, [displayAddMyChildrenalbums]);
  function sortalbums(event) {
    event.preventDefault();
    let sortArr = album.slice();
    switch (event.target.value) {
      case "id":
        setalbums(sortArr.sort((a, b) => a.albumId - b.albumId));
        break;
      case "alphabet":
        setalbums(sortArr.sort((a, b) => (a.name > b.name ? 1 : -1)));
        break;
      case "random":
        setalbums(sortArr.sort(() => (Math.random() > 0.5 ? -1 : 1)));
        break;
    }
  }
  function searchalbums(event) {
    let foundsArr, foundIndex;
    const { name, value } = event.target;
    switch (name) {
      case "id":
        foundIndex = originalAlbums.findIndex(
          (t) => t != null && t.albumId == value
        );
        setalbums([
          {
            ...originalAlbums[foundIndex],
            originalIndex: foundIndex,
            editable: false,
          },
        ]);
        break;
      case "title":
        foundsArr = originalAlbums.map((t, i) => {
          if (t != null && t.name .includes(value))
            return { ...t, originalIndex: i, editable: false };
        });
        setalbums(foundsArr.filter((t) => t != null));
        break;
    
    }
  }

  function selectSearchType(event) {
    let foundsArr;
    if (event.target.value == "all") {
      foundsArr = originalAlbums.map((t, i) => {
        if (t != null) return { ...t, originalIndex: i, editable: false };
      });
      setalbums(foundsArr.filter((t) => t != null));
      setSearchType();
    } else setSearchType(event.target.value);
  }

  return (
    <>
      <br />
      <label htmlFor="sort">order by</label>
      <select onChange={sortalbums} name="sort">
        <option value="all"> </option>
        <option value="id">id</option>
        <option value="alphabet">alphabet</option>
        <option value="random">random</option>
      </select>

      <label htmlFor="search">search by</label>
      <select onChange={selectSearchType} name="search">
        <option value="all"></option>
        <option value="id">id</option>
        <option value="title">title</option>
      </select>
      <br />

      {searchType ? (
        searchType == "id" ? (
          <>
            <label htmlFor="id">id</label>
            <input 
              type="text"
              name="id"
              onChange={(event) => searchalbums(event)}
            />
          </>
        ) : (
          <>
            <input
              type="text"
              name={searchType}
              onChange={(event) => searchalbums(event)}
            />
          </>
        )
      ) : (
        <></>
      )}
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
      <div className="album"
       
        // style={{ display: "flex", flexDirection: "row" }}
      >
        {album.map((item, index) => (
          <div key={index} className="cardDiv">
            <div className="card"
              onClick={() => navigate(`./${item.albumId}`)}
              shadow="sm"
              key={item.id}
              isPressable
              style={{ flex: 1 }}
            >
             
                <img
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={item.name}
                  className="w-full object-cover h-[140px]"
                  src={item.albumPhoto || "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg"} //auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                />
              <div className="text-small justify-between">
                <b>{item.name}</b>
                <p className="text-default-500">{item.childName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {allalbums.map((albums, index) => {
        return <><h3>{albums.name}</h3>
          <h3>{albums.childName}</h3>
        </>
      })} */}

      {/* 
      <CardGroup>
        {allalbums.map((albums, index) => (
          <Card onClick={() => navigate(`./${albums.albumsId}`)}>
            <CardImg
              alt="Card image cap"
              src={albums.img}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                {albums.name}
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {albums.img}
              </CardSubtitle>
              <Button>Show more</Button>
            </CardBody>
          </Card>))}
      </CardGroup> */}
    </>
  );
}

export default MyChildrensAlbums;
