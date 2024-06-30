import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReq,deleteReq } from "../../serverquests";
import { format } from 'date-fns';
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";

import AddItemToAlbum from "./AddItemToAlbum";

function SingleAlbum() {
  const params = useParams();
  const [allItems, setAllItems] = useState([]);
  const [displayAddItem, setDisplayAddItem] = useState(false);
  const [deleteItemNum,setDelteItemNum]=useState(0)
  function deleteItem(idItem)
  {
    const req = {
      method: "DELETE",
      route: `items/${idItem}`,
    };
    deleteReq(req).then(
      setDelteItemNum(deleteItemNum+1)
    )
  }
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
          console.log(responseJson);
        })
        .catch((err) => {});
    }
  }, [displayAddItem,deleteItemNum]);

  return (
    <>
      {/* <h4>{allItems.map((item) => {
        return <>{item.idtype == 1 ? <img src={item.data} />
          : item.idtype == 3 ? <video controls><source src={item.data} /></video> :
            <span>{item.data}</span>} <br /></>
      })}</h4> */}
      <div>
        <Timeline
          sx={{
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
          }}
        >
          {allItems.map((item) => {
            return (
              <TimelineItem>
                <TimelineOppositeContent color="textSecondary">
                  
                  { format(  item.creationdate, 'dd/MM/yyyy')
               
                  }
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <>
                    {item.idtype == 1 ? (
                      <img src={item.data} />
                    ) : item.idtype == 3 ? (
                      <video controls>
                        <source src={item.data} />
                      </video>
                    ) : (
                      <span>{item.data}</span>
                    )}{" "}
                    <br />
                  </>{" "}
                  <span onClick={()=>deleteItem(item.id)}>
                    🗑️
                  </span>
                </TimelineContent>
              </TimelineItem>
            );
            {
              /* <>{item.idtype == 1 ? <img src={item.data} />
        : item.idtype == 3 ? <video controls><source src={item.data} /></video> :
          <span>{item.data}</span>} <br /></> */
            }
          })}
        </Timeline>
      </div>
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
