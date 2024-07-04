import React, { useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import AddChild from "./AddChild";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MyChildren() {
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  const [children, setChildren] = useState([])
  const [displayAddChild, setDisplayAddChild] = useState(false)

  useEffect(() => {
    if (!displayAddChild) {
      const req = { route: `children/myChildren/${user.username}` };
      getReq(req).then((response) => response.json()).then((responseJson) => {
        setChildren(responseJson)
      }).catch(err => notify(err.errorCode, err.errorText))
    }
  }, [displayAddChild])

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
      <button onClick={() => setDisplayAddChild(!displayAddChild)}><i className="material-icons">person_add</i></button>
      {displayAddChild && <AddChild setDisplayAddChild={setDisplayAddChild} />}
      <div className="childContanier" >
        {
          children.map(child =>
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
                <Button onClick={() => navigate(`./${child.childName}/albums`)} size="small">See Albums</Button>
              </CardActions>
            </React.Fragment>
          </div>
          )
          )
        }
      </div >
      <ToastContainer />
    </>
  );
}

export default MyChildren;