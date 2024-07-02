import React, { useRef, useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { useForm } from "react-hook-form";
import { Link, json, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import {  CardBody, CardFooter, Image } from "@nextui-org/react";
import AddChild from "./AddChild";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MyChildren() {
    const navigate = useNavigate();
    const user = useContext(UserContext).user;
    const { register, handleSubmit } = useForm();
    const [children, setChildren] = useState([])
    const [displayAddChild, setDisplayAddChild] = useState(false)

    useEffect(() => {
        if(!displayAddChild){
        const req = {
            method: "GET",
            route: `children/myChildren/${user.username}`
        };
        getReq(req).then((response) => response.json()).then((responseJson) => {
            setChildren(responseJson)
            //console.log(responseJson);
        }).catch(err =>           notify(err.errorCode,err.errorText)
        )

    }
},  [displayAddChild])
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

    return (
        <>
        
            <button onClick={() => setDisplayAddChild(!displayAddChild)}>    <i className="material-icons">person_add</i></button>
            {displayAddChild && <AddChild setDisplayAddChild={setDisplayAddChild} />}
            <div className="childContanier" >
                {
                    children.map(child=>
                        (<div className="child" >
                            <React.Fragment>
                            <CardContent>
                              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {child.id}
                              </Typography>
                              <Typography variant="h5" component="div">
                               {child.username}
                              </Typography>
                              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {child.nickname}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button   onClick={() => navigate(`./${child.childName}/albums`)}  size="small">See Albums</Button>
                            </CardActions>
                          </React.Fragment>
                          </div>
                        )
                    )
                }
            </div >
            <ToastContainer />
            {/* {children.map((album, index) => {
        return <><h3>{album.name}</h3>
          <h3>{album.childName}</h3>
        </>
      })} */}
        </>
    );
}

export default MyChildren;


// {children.map((child, index) => (
//     <div key={index}>
//         <div className="card"// onClick={()=> navigate(`./${child.albumId}`)}
//             shadow="sm" key={child.id} //isPressable
//             onClick={() => navigate(`./${child.childName}/albums`)} 
//             >
     
//             <div className="text-small justify-between">
//                 <b>{(child.nickname).toLowerCase()}</b>
//                 {/* <p className="text-default-500">{child.price}</p> */}
//             </div>
//         </div>
//     </div>
// ))}