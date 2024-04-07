import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import test_img from "../test/test_img.jpg";
import Image from "react-bootstrap/Image";
import { Container } from "react-bootstrap";

const VideoStream = ({ selectedCam }) => {

  const [dragLines, setDragLines] = useState([]);
  const [camId, setCamId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoStreamRef = useRef(null);

  useEffect(() => {
    setCamId(selectedCam);
    console.log(selectedCam);
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

    // Add a global click event listener to close the context menu
    window.addEventListener("click", handleClick);

    // Cleanup function
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
    // No need to hide the menu here anymore since handleClick will take care of it
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
      <Container className="right-click-menu">
        <ul>
          <li onClick={() => handleContextMenuAction("add-boundary")}>
            Add Boundary
          </li>
        </ul>
      </Container>
    </Container>
  );
};

export default VideoStream;