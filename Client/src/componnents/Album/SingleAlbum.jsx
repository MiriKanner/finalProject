import { useState } from "react";
import AddItemToAlbum from "./AddItemToAlbum";

function SingleAlbum() {
    const [displayAddItem, setDisplayAddItem] = useState(false);

    return (<>
        <h1>single album</h1>
        <button onClick={() => setDisplayAddItem(!displayAddItem)}>Add to album!</button>
        {displayAddItem && <AddItemToAlbum setDisplayAddItem={setDisplayAddItem} />}
    </>)
}
export default SingleAlbum;