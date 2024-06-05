import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchRequ from "../../serverquests";

import AddItemToAlbum from "./AddItemToAlbum";

function SingleAlbum() {
    const params=useParams()
    const [allItems,setAllItems]=useState([])
  const [displayAddItem, setDisplayAddItem] = useState(false);
  useEffect(() => {
   
      const req = {
        method: "GET",
        route: `items/${params.albumId}`,
      };
      fetchRequ(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setAllItems(responseJson);
          //    console.log(responseJson);
        })
        .catch((err) => {});
    }
  );
  return (
    <>
      <h4>{allItems.map((item)=>{
        // switch(item.)
         return item.data+" "
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
