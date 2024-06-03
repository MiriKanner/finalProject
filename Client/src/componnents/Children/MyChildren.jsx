import React, { useRef, useState, useEffect } from "react";
import fetchRequ from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";



function MyChildren() {
    const navigate = useNavigate();
    const user = useContext(UserContext).user;
    const { register, handleSubmit } = useForm();
    const [children, setChildren] = useState([])
    const [displayAddMyChildrenAlbum, setDisplayAddMyChildrenAlbum] = useState(false);

    useEffect(() => {
        const req = {
            method: "GET",
            route: `children/myChildren/${user.username}`
        };
        fetchRequ(req).then((response)=>response.json()).then((responseJson) => {
            setChildren(responseJson)
            console.log(responseJson);
        }).catch(err => { })

    }, [])

    return (
        <>
            {/* <button onClick={() => setDisplayAddMyChildrenAlbum(!displayAddMyChildrenAlbum)}>Add Album to my child</button> */}
            {/* {displayAddMyChildrenAlbum && <AddMyChildrenAlbum />} */}
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                {children.map((child, index) => (
                    <div>
                        <Card // onClick={()=> navigate(`./${child.albumId}`)}
                            shadow="sm" key={child.id} isPressable
                            onClick={()=>navigate(`./${child.childName}`)} >
                            {/* <CardBody className="overflow-visible p-0">
                                <Image
                                    shadow="sm"
                                    radius="lg"
                                    width="100%"
                                    alt={child.name}
                                    className="w-full object-cover h-[140px]"
                                    src={child.img}
                                />
                            </CardBody> */}
                            <CardFooter className="text-small justify-between">
                                <b>{(child.nickname).toLowerCase()}</b>
                                {/* <p className="text-default-500">{child.price}</p> */}
                            </CardFooter>
                        </Card>
                    </div>
                ))}
            </div >
            {/* {children.map((album, index) => {
        return <><h3>{album.name}</h3>
          <h3>{album.childName}</h3>
        </>
      })} */}
        </>
    );
}


export default MyChildren;
