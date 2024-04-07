import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import DragRoi from "./DragRoi";
import test_img from "../test/test_img.jpg";
import Image from "react-bootstrap/Image";
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

  useEffect(() => {
    const handleRightClick = (event) => {
      event.preventDefault();
      const menu = document.querySelector(".right-click-menu");
      menu.style.top = `${event.pageY}px`;
      menu.style.left = `${event.pageX}px`;
      menu.classList.add("visible");
    };

    const handleClick = (event) => {
      const menu = document.querySelector(".right-click-menu");
      if (menu.classList.contains("visible")) {
        menu.classList.remove("visible");
      }
    };

    const videoStreamElement = videoStreamRef.current;
    videoStreamElement.addEventListener("contextmenu", handleRightClick);

    window.addEventListener("click", handleClick);

    return () => {
      videoStreamElement.removeEventListener("contextmenu", handleRightClick);
      window.removeEventListener("click", handleClick);
    };
  }, []);
  
  const handleContextMenuAction = (action) => {
    if (action === "add-boundary") {
      const newDragLine = { key: Date.now() };
      setDragLines([...dragLines, newDragLine]);
    }

    if (action === "add-roi") {
      const newDragRoi = { key: Date.now() };
      setDragRoi([...dragRoi, newDragRoi]);
    }

  };
  

  return (
    <Container
      className="video-stream-container"
      ref={videoStreamRef}
      onLoad={() => {
        setPosition({
          x: videoStreamRef.current.getBoundingClientRect().x + window.scrollX,
          y: videoStreamRef.current.getBoundingClientRect().y + window.scrollY,
        });
      }}
    >
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
      <Container className="right-click-menu">
        <ul>
          <li onClick={() => handleContextMenuAction("add-boundary")}>
            Add Boundary
          </li>
          <li onClick={() => handleContextMenuAction("add-roi")}>
            Add Roi
          </li>
        </ul>
      </Container>
    </Container>
  );
};

export default VideoStream;