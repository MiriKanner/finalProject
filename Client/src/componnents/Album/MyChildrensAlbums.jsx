import React, { useState, useEffect } from "react";
import { getReq } from "../../serverquests";
import { useContext } from "react";
import { UserContext } from "../../App";
import AddMyChildrenAlbum from "./AddMyChildrenAlbum";
import AllAlbums from "./AllAlbums";
import SearchAndSortAlbum from "./SearchAndSortAlbum";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyChildrensAlbums() {
  const user = useContext(UserContext).user;
  const [albums, setalbums] = useState([]);
  const [originalAlbums, setOriginalAlbums] = useState([]);
  const [displayAddMyChildrenalbums, setDisplayAddMyChildrenalbums] = useState(false);

  useEffect(() => {
    if (!displayAddMyChildrenalbums) {
      const req = { route: `album/myChildrenalbum/${user.username}` };
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setOriginalAlbums(responseJson);
          setalbums(responseJson);
        })
        .catch((err) => notify(err.errorCode, err.errorText));
    }
  }, [displayAddMyChildrenalbums]);

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
      <ToastContainer />
      <SearchAndSortAlbum originalAlbums={originalAlbums} setOriginalAlbums={setOriginalAlbums} albums={albums} setalbums={setalbums} />
      <button onClick={() => setDisplayAddMyChildrenalbums(!displayAddMyChildrenalbums)}      >
        Add albums to my child
      </button>
      {displayAddMyChildrenalbums && (
        <AddMyChildrenAlbum setDisplayAddMyChildrenalbums={setDisplayAddMyChildrenalbums} />
      )}
      <div className="album">
        {albums.length > 0 ? <AllAlbums albums={albums} displayAddMyChildrenalbums={displayAddMyChildrenalbums} />
          : <p>no items. why don't you add some?</p>}
      </div>
    </>
  );
}

export default MyChildrensAlbums;
