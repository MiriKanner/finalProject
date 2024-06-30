import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReq, deleteReq } from "../../serverquests";
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
  const [deleteItemNum, setDelteItemNum] = useState(0)

  function deleteItem(idItem) {
    
    if (confirm('Are You Sure To Delete Item '+idItem) == true) {
      const req = {
        method: "DELETE",
        route: `items/${idItem}`,
      };
      deleteReq(req).then(
        setDelteItemNum(deleteItemNum + 1)
      )
    }
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
          // console.log(responseJson);
        })
        .catch((err) => { });
    }
  }, [displayAddItem, deleteItemNum]);

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

                  {format(item.creationdate, 'dd/MM/yyyy')

                  }
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div ><>
                    {item.idtype == 1 ? (
                      <img className="imgItem" src={item.data} />
                    ) : item.idtype == 3 ? (
                      <video className="imgItem" controls>
                        <source src={item.data} />
                      </video>
                    ) : item.idtype == 2 ? (<span className="icon">{String.fromCodePoint("0x" + item.data)
                    }</span>) :
                      (
                        <span>{item.data}</span>
                      )}{" "}

                  </>{" "}
                    <span onClick={() => deleteItem(item.id)}>
                      🗑️
                    </span>
                  </div>
                  <br />
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
      </div >
      <button onClick={() => setDisplayAddItem(!displayAddItem)}>
        Add to album!
      </button>
      {
        displayAddItem && (
          <AddItemToAlbum setDisplayAddItem={setDisplayAddItem} />
        )
      }
    </>
  );
}
 export default SingleAlbum;
// import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';

// function srcset(image: string, size: number, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`,
//   };
// }

// export default function QuiltedImageList() {
//   return (
//     <ImageList
//       sx={{ width: 500, height: 450 }}
//       variant="quilted"
//       cols={4}
//       rowHeight={121}
//     >
//       {itemData.map((item) => (
//         <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
//           <img
//             {...srcset(item.img, 121, item.rows, item.cols)}
//             alt={item.title}
//             loading="lazy"
//           />
//         </ImageListItem>
//       ))}
//     </ImageList>
//   );
// }