import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import DragRoi from "./DragRoi";
import test_img from "../test/test_img.jpg";
import config from "../config/config";
import Image from "react-bootstrap/Image";
import ContextMenu from "./ContextMenu";

const VideoStream = ({ selectedCam }) => {

  const [dragLines, setDragLines] = useState([]);
  const [dragRois, setDragRois] = useState([]);
  const [camId, setCamId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoStreamRef = useRef(null);

  useEffect(() => {
    setCamId(selectedCam);
  }, [selectedCam]);
  
  
  const itemClickHandler = (item) =>{
    if (item.id === "1") {
      // add boundary
      const newDragLine = { key: Date.now().toString(), id: `${Date.now().toString()}` };
      setDragLines([...dragLines, newDragLine]);
    }

    if (item.id === "2") {
      // add roi
      const newDragRois = { key: Date.now().toString(), id: `${Date.now().toString()}` };
      setDragRois([...dragRois, newDragRois]);
    }

  }

  return (
    <div
      className="video-stream-container"
      ref={videoStreamRef}
      onLoad={() => {
        setPosition({
          x: videoStreamRef.current.getBoundingClientRect().x + window.scrollX,
          y: videoStreamRef.current.getBoundingClientRect().y + window.scrollY,
        });}}>

      <ContextMenu 
        id='link-context-menu' 
        onItemClicked={itemClickHandler}
        items={[
          {
            id: "1",
            caption: "Add boundary",
          },
          {
            id: "2",
            caption: "Add ROI",
          },
      ]}>
        <Image
          src={test_img}
          alt="Video Stream"
          style={{ width: 800, height: 600 }}
          rounded
        />
      </ContextMenu>

        {dragLines.map((line) => (
          <DragLine
            key = {line.key}
            id = {line.id}
            parentRef={videoStreamRef}
            x={position.x}
            y={position.y}
            camId={camId}
          />
        ))}
        {dragRois.map((roi) => (
          <DragRoi
            key={roi.key}
            id = {roi.id}
            parentRef={videoStreamRef}
            x={position.x }
            y={position.y }
            camId={camId}
          />
        ))}
      
    </div>
  );
};

export default VideoStream;