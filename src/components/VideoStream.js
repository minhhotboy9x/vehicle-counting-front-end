import React, { useState, useEffect, useRef } from "react";
import DragLine from "./DragLine";
import DragRoi from "./DragRoi";
import test_img from "../test/test_img.jpg";
import Image from "react-bootstrap/Image";
import ContextMenu from "./ContextMenu";
import config from "../config/config";
import { getBoundaries } from "../api/DragLineApi";
import { getRois } from "../api/DragRoiApi";

// config.TESTSTREAMING

const VideoStream = ({ selectedCam, setProperty }) => {

  const [dragLines, setDragLines] = useState([]);
  const [dragRois, setDragRois] = useState([]);
  const [camId, setCamId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const videoStreamRef = useRef(null);

  useEffect(() => {
    // console.log(`selectedcam: ${selectedCam} ${typeof selectedCam}`);
    setCamId(selectedCam);
    const fetchBoundaries = async () => {
      const res = await getBoundaries({ "camId": selectedCam });
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
      setDragLines(newDragLines);
    };
    fetchBoundaries();

    const fetchRois = async () => {
      const res = await getRois({ "camId": selectedCam });
      const rois = res['rois'];
      const newDragRois = rois.map(roi => {
        return {
          id: roi.id,
          camId: roi.camId,
          points: roi.points,
          initLock: true,
          key: roi.id,
        };
      });
      setDragRois(newDragRois);
    };
    fetchRois();
  }, [selectedCam]);


  const itemClickHandler = (item) => {
    if (item.id === "1") {
      // add boundary 
      const newDragLine = {
        key: Date.now().toString(),
        id: `${Date.now().toString()}`,
        initLock: false,
        pointL: { x: 150, y: 250 },
        pointR: { x: 250, y: 300 },
      };

      setDragLines([...dragLines, newDragLine]);
    }

    if (item.id === "2") {
      // add roi
      const newDragRois = {
        key: Date.now().toString(),
        id: `${Date.now().toString()}`,
        initLock: false,
        points: (() => {
          let newPositions = [];
          for (let i = 0; i < 4; i++) {
            const newPos = { x: (i % 2) * 50 + 50, y: parseInt(i / 2) * 50 + 50 };
            newPositions.push(newPos);
          }
          return newPositions;
        })()
      };
      // console.log(newDragRois)
      setDragRois([...dragRois, newDragRois]);
    }
  }

  const deleteDragLine = (id) => {
    setDragLines(dragLines.filter(line => line.key !== id));
  };

  const deleteDragRoi = (id) => {
    setDragRois(dragRois.filter(roi => roi.key !== id));
  };

  return (
    <div
      className="video-stream-container"
    >
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
          onLoad={() => {
            setPosition({
              x: videoStreamRef.current.getBoundingClientRect().x + window.scrollX,
              y: videoStreamRef.current.getBoundingClientRect().y + window.scrollY,
            });
            // console.log(position);
          }}
          src={`${config.BACKEND}/streaming/${camId}`}
          alt="Video Stream"
          style={{ width: 800, height: 600 }}
          rounded
        />
      </ContextMenu>

      {dragLines.map((line) => (
        <DragLine
          key={line.key}
          id={line.id}
          parentRef={videoStreamRef}
          x={position.x}
          y={position.y}
          pointL={line.pointL}
          pointR={line.pointR}
          camId={camId}
          initLock={line.initLock}
          deleteDragLine={deleteDragLine}
          setProperty={setProperty}
        />
      ))}
      {dragRois.map((roi) => (
        <DragRoi
          key={roi.key}
          id={roi.id}
          parentRef={videoStreamRef}
          x={position.x}
          y={position.y}
          camId={camId}
          points={roi.points}
          initLock={roi.initLock}
          deleteDragRoi={deleteDragRoi}
          setProperty={setProperty}
        />
      ))}

    </div>
  );
};

export default VideoStream;