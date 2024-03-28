import React, { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';


const DragLine = ({ parentRef }) => {
  const [controlledPositionL, setControlledPositionL] = useState({ x: 50, y: 250 });
  const [controlledPositionR, setControlledPositionR] = useState({ x: 250, y: 300 });

  const [middleBounds, setMiddleBounds] = useState({
    left: parentRef.current.getBoundingClientRect().x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 , // Minimum X position
    top: parentRef.current.getBoundingClientRect().y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,  // Minimum Y position
    right:  parentRef.current.getBoundingClientRect().x + parentRef.current.getBoundingClientRect().width  
                                                        - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2- 20, // Maximum X position
    bottom: parentRef.current.getBoundingClientRect().y + parentRef.current.getBoundingClientRect().height 
                                                        - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20, // Maximum Y position
  });

  const customBounds = {
    left: parentRef.current.getBoundingClientRect().x, // Minimum X position
    top: parentRef.current.getBoundingClientRect().y,  // Minimum Y position
    right:  parentRef.current.getBoundingClientRect().x + parentRef.current.getBoundingClientRect().width-20, // Maximum X position
    bottom: parentRef.current.getBoundingClientRect().y + parentRef.current.getBoundingClientRect().height-20, // Maximum Y position
  };

  useEffect(() => {
    setMiddleBounds({
      left: parentRef.current.getBoundingClientRect().x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 , // Minimum X position
      top: parentRef.current.getBoundingClientRect().y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,  // Minimum Y position
      right:  parentRef.current.getBoundingClientRect().x + parentRef.current.getBoundingClientRect().width  
                                                          - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2- 20, // Maximum X position
      bottom: parentRef.current.getBoundingClientRect().y + parentRef.current.getBoundingClientRect().height 
                                                          - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20, // Maximum Y position
    })
  },[controlledPositionL, controlledPositionR]);

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
    console.log(parentRef.current);
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
      <Draggable position={controlledPositionL} onDrag={onControlledDragL} bounds={customBounds}>
        <span className="dot" />
      </Draggable>

      <Draggable position={controlledPositionR} onDrag={onControlledDragR} bounds={customBounds}>
        <span className="dot" />
      </Draggable>

      <Draggable position={halfwayPoint} onDrag={onControlledDragMidpoint} bounds={middleBounds}>
        <span className="dot" />
      </Draggable>

      <Line
        className="line"
        x0={controlledPositionL.x + 7.5}
        y0={controlledPositionL.y + 7.5}
        x1={controlledPositionR.x + 7.5}
        y1={controlledPositionR.y + 7.5}
        borderColor='red'
        borderWidth={"5px"}
      />
    </div>
  );
};

export default DragLine;