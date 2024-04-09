import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import DragRoi from "./DragRoi";
import test_img from "../test/test_img.jpg";
import Image from "react-bootstrap/Image";
import ContextMenu from "./ContextMenu";
import { Container } from "react-bootstrap";

const VideoStream = ({ selectedCam }) => {

  const [dragLines, setDragLines] = useState([]);
  const [dragRoi, setDragRoi] = useState([]);
  const [camId, setCamId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoStreamRef = useRef(null);

  useEffect(() => {
    setCamId(selectedCam);
  }, [selectedCam]);
  
  
  const itemClickHandler = (item) =>{
    if (item.id === "1") {
      // add boundary
      const newDragLine = { key: Date.now() };
      setDragLines([...dragLines, newDragLine]);
    }

    if (item.id === "2") {
      // add roi
      const newDragRoi = { key: Date.now() };
      setDragRoi([...dragRoi, newDragRoi]);
    }

  }

  return (
    <Container
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
        {dragLines.map((line) => (
          <DragLine
            key={line.key}
            parentRef={videoStreamRef}
            x={position.x }
            y={position.y }
          />
        ))}
        {dragRoi.map((line) => (
          <DragRoi
            key={line.key}
            parentRef={videoStreamRef}
            x={position.x }
            y={position.y }
          />
        ))}
      </ContextMenu>
    </Container>
  );
};

export default VideoStream;