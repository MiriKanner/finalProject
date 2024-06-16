import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getReq} from "../../serverquests";

import AddItemToAlbum from "./AddItemToAlbum";

function SingleAlbum() {
  const params = useParams()
  const [allItems, setAllItems] = useState([])
  const [displayAddItem, setDisplayAddItem] = useState(false);
  useEffect(() => {
    if (!displayAddItem) {
      const req = {
        method: "GET",
        route: `items/${params.albumId}`,
      };
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setAllItems(responseJson);
        })
        .catch((err) => { });
    }
  }, [displayAddItem]);

  return (
    <>
      <h4>{allItems.map((item) => {
        // switch(item.)
        return <><span>*{item.data }</span> <br /></>
      })}</h4>
      <button onClick={() => setDisplayAddItem(!displayAddItem)}>
        Add to album!
      </button>
      {displayAddItem && (
        <AddItemToAlbum setDisplayAddItem={setDisplayAddItem} />
      )}
    </>
  );
}
export default SingleAlbum;
