import React, { useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';


const DragLine = ({ parentRef }) => {
  const [controlledPositionL, setControlledPositionL] = useState({ x: 50, y: 250 });
  const [controlledPositionR, setControlledPositionR] = useState({ x: 250, y: 250 });


  const onControlledDragL = (e, position) => {
    setControlledPositionL({ x: position.x, y: position.y });
  };

  const onControlledDragR = (e, position) => {
    setControlledPositionR({ x: position.x, y: position.y });
  };

  const onControlledDragMidpoint = (e, position) => {
    setControlledPositionL((prevPosition) => ({
      x: prevPosition.x + position.deltaX,
      y: prevPosition.y + position.deltaY
    }));
    // console.log(controlledPositionL, controlledPositionR);
    setControlledPositionR((prevPosition) => ({
      x: prevPosition.x + position.deltaX,
      y: prevPosition.y + position.deltaY
    }));
  };

  const getHalfwayPoint = () => {
    return {
      x: (controlledPositionL.x + controlledPositionR.x) / 2,
      y: (controlledPositionL.y + controlledPositionR.y) / 2
    };
  };

  const halfwayPoint = getHalfwayPoint();

  return (
    <div className="overlay">
      <Draggable position={controlledPositionL} onDrag={onControlledDragL} bounds={`.${parentRef.current.className}`}>
        <span className="dot" />
      </Draggable>

      <Draggable position={controlledPositionR} onDrag={onControlledDragR} bounds={`.${parentRef.current.className}`}>
        <span className="dot" />
      </Draggable>

      <Draggable position={halfwayPoint} onDrag={onControlledDragMidpoint} bounds={`.${parentRef.current.className}`}>
        <span className="dot" />
      </Draggable>

      <Line
        className="line"
        x0={controlledPositionL.x + 10}
        y0={controlledPositionL.y + 10}
        x1={controlledPositionR.x + 10}
        y1={controlledPositionR.y + 10}
      />
    </div>
  );
};

export default DragLine;