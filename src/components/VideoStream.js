import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import DragRoi from "./DragRoi";
import test_img from "../test/test_img.jpg";
import Image from "react-bootstrap/Image";
import ContextMenu from "./ContextMenu";
import { getBoundaries } from "../api/DragLineApi";

const VideoStream = ({ selectedCam }) => {

  const [dragLines, setDragLines] = useState([]);
  const [dragRois, setDragRois] = useState([]);
  const [camId, setCamId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoStreamRef = useRef(null);

  useEffect(() => {
    setCamId(selectedCam);
    const fetchData = async () => {
        setCamId(selectedCam);
        const res = await getBoundaries({"camId": selectedCam});
        const boundaries = res['boundaries'];
        const newDragLines = boundaries.map(boundary => {
          return {
              id: boundary.id,
              camId: boundary.camId,
              pointL: boundary.pointL,
              pointR: boundary.pointR,
              pointDirect: boundary.pointDirect,
              initLock: true,
              key: boundary.id,
          };
        }); 
      
      // Đặt danh sách mới vào trong state `dragLines`
      setDragLines(newDragLines);
    };
    fetchData();
  
  }, [selectedCam]);
  
  
  const itemClickHandler = (item) => {
    if (item.id === "1") {
      // add boundary 
      const newDragLine = { 
                        key: Date.now().toString(), 
                        id: `${Date.now().toString()}`, 
                        initLock: false,
                        pointL: {x: 150, y: 250},
                        pointR: {x: 250, y: 300},
                      };

      setDragLines([...dragLines, newDragLine]);
    }

    if (item.id === "2") {
      // add roi
      const newDragRois = { key: Date.now().toString(), id: `${Date.now().toString()}`, initLock: false };
      setDragRois([...dragRois, newDragRois]);
    }
  }

  const deleteDragLine = (id) => {
    setDragLines(dragLines.filter(line => line.key !== id));
  };

  return (
    <div
      className="video-stream-container"
      
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
          ref={videoStreamRef}
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
            pointL={line.pointL}
            pointR={line.pointR}
            camId={camId}
            initLock={line.initLock}
            deleteDragLine = {deleteDragLine}
          />
        ))}
        {dragRois.map((roi) => (
          <DragRoi
            key={roi.key}
            id = {roi.id}
            parentRef={videoStreamRef}
            x={position.x}
            y={position.y}
            camId={camId}
            initLock={roi.initLock}
          />
        ))}
      
    </div>
  );
};

export default VideoStream;