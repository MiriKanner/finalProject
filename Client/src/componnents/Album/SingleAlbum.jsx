import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReq, deleteReq } from "../../serverquests";
import { format } from "date-fns";
import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import AddItemToAlbum from "./AddItemToAlbum";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrGallery } from "react-icons/gr";
import { LiaListUlSolid } from "react-icons/lia";

function SingleAlbum() {
  const params = useParams();
  const [allItems, setAllItems] = useState([]);
  const [displayAddItem, setDisplayAddItem] = useState(false);
  const [deleteItemNum, setDelteItemNum] = useState(0);
  const [galleryDisplay, setGalleryDisplay] = useState(false);
  const [start, setStart] = useState(0);
  const [amountOfDisplayedPhotos, setAmountOfDisplayedPhotos] = useState(8);
  const [loadMore, setLoadMore] = useState(true)

  const notify = (errorCode, errorMessage) =>
    toast.error(`error code:${errorCode}. error message:${errorMessage}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function deleteItem(idItem) {
    if (confirm("Are You Sure To Delete Item " + idItem) == true) {
      const req = { route: `items/${idItem}` };
      deleteReq(req)
        .then(setDelteItemNum(deleteItemNum + 1))
        .catch((err) => notify(err.errorCode, err.errorText));
    }
  }

  useEffect(() => {
    if (!displayAddItem) {
      const req = {
        route: `items/${params.albumId}?_start=0&_end=10`,
      };
      getReq(req)
        .then((response) => response.json())
        .then((responseJson) => {
          setAllItems(responseJson);
        })
        .catch((err) => {
          notify(err.errorCode, err.errorText);
        });
    }
  }, [displayAddItem, deleteItemNum]);

  useEffect(() => {
    const req = { route: `items/${params.albumId}?_start=${start}&_end=${start + 10}` };
    if (start)
      getReq(req)
        .then((response) => response.json())
        .then((data) => {
          if (!data.length)
            setLoadMore(false)
          setAllItems((prevPhotos) => [...prevPhotos, ...data]);
        })
        .catch((err) => {
          notify(err.errorCode, err.errorText);
        });
  }, [start]);

  const handleLoadMore = () => {
    setStart(prev => prev + 10);
    setAmountOfDisplayedPhotos(prev => prev + 8)
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  function allItemsImageMatrix(items) {
    const filteredItems = items.filter((item) => item.idtype === 1);
    const numRows = Math.ceil(Math.sqrt(filteredItems.length));
    const numCols = numRows;
    const matrix = Array.from({ length: numRows }, () => new Array(numCols).fill(null));
    filteredItems.forEach((item, index) => {
      const row = Math.floor(index / numCols);
      const col = index % numCols;
      matrix[row][col] = item;
    });
    let array = new Array();
    for (let i = 0; i < numRows; i++)
      for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] != null)
          array.push({
            rows: i,
            cols: j,
            data: matrix[i][j].data,
            id: matrix[i][j].id,
            creationdate: matrix[i][j].creationdate,
          });
      }
    return array;
  }

  return (
    <>
      <button className="gallery-display-button" onClick={() => setGalleryDisplay(!galleryDisplay)}>
        {!galleryDisplay ? <GrGallery /> : <LiaListUlSolid />}
      </button>
      <button className="add-to-album" onClick={() => setDisplayAddItem(!displayAddItem)}>
        Add to album!
      </button>
      {displayAddItem && (<AddItemToAlbum setDisplayAddItem={setDisplayAddItem} />)}
      {allItems.length > 0 ? <>
        {!galleryDisplay && (
          <div className="timeLine">
            <Timeline sx={{ [`& .${timelineOppositeContentClasses.root}`]: { flex: 0.2, }, }}          >
              {allItems.map((item, index) => {
                if (index < amountOfDisplayedPhotos)
                  return (
                    <TimelineItem>
                      <TimelineOppositeContent color="textSecondary">
                        {format(item.creationdate, "dd/MM/yyyy")}
                        <span onClick={() => deleteItem(item.id)} style={{ cursor: "pointer" }}>🗑️</span>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <div className="timeLineItem" >
                          <>
                            {item.idtype == 1 ? (
                              <img className="imgItem" src={item.data} />
                            ) : item.idtype == 3 ? (
                              <video className="imgItem" controls>
                                <source src={item.data} />
                              </video>
                            ) : item.idtype == 2 ? (
                              <span className="icon">
                                {String.fromCodePoint("0x" + item.data)}
                              </span>
                            ) : (
                              <p style={{ display: "block", overflow: "hidden", wordWrap: "break-word" }}>{item.data}</p>
                            )}{" "}
                          </>{" "}
                        </div>
                        <br />
                      </TimelineContent>
                    </TimelineItem>
                  );
              })}
            </Timeline>
            {loadMore && <button onClick={handleLoadMore}>Load More</button>}
          </div>
        )}
        {galleryDisplay && (
          <div className="imgeGallery">
            <ImageList
              sx={{ width: 500, height: 450 }}
              variant="quilted"
              cols={galleryDisplay.length > 20 ? 4 : 3}
              rowHeight={150}
            >
              {allItemsImageMatrix(allItems).map((item) => (
                <ImageListItem
                  key={item.id}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img
                    {...srcset(item.data, 150, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={format(item.creationdate, "dd/MM/yyyy")}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        )}</>
        : <p>no items. why don't you add some?</p>}
      <ToastContainer />
    </>
  );
}
export default SingleAlbum;
