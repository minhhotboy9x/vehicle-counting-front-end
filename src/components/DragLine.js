import React, { useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';


const DragLine = () => {
  const [controlledPositionL, setControlledPositionL] = useState({ x: 50, y: 50 });
  const [controlledPositionR, setControlledPositionR] = useState({ x: 250, y: 50 });

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
      <Draggable position={controlledPositionL} onDrag={onControlledDragL}>
        <span className="dot" />
      </Draggable>

      <Draggable position={controlledPositionR} onDrag={onControlledDragR}>
        <span className="dot" />
      </Draggable>

      <Draggable position={halfwayPoint} onDrag={onControlledDragMidpoint} bounds="parent">
        <span className="dot" />
      </Draggable>

      <Line
        className="line"
        x0={controlledPositionL.x + 2.5}
        y0={controlledPositionL.y + 2.5}
        x1={controlledPositionR.x + 2.5}
        y1={controlledPositionR.y + 2.5}
      />
    </div>
  );
};

export default DragLine;