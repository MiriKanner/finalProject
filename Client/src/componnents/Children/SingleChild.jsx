import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReq } from "../../serverquests";
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

// import AddItemToAlbum from "./AddItemToAlbum";

function SingleChild() {
  const params = useParams();
  const myUsername=params.childName;
  useEffect(() => {

  }, []);

  return (
    <>
    
    </>
  );
}
export default SingleChild;;
