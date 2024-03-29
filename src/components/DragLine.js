import React, { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';

const DragLine = ({ parentRef }) => {
  const [parentOffset, setParentOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const rect = parentRef.current.getBoundingClientRect();
    setParentOffset({ x: rect.left, y: rect.top });
  }, [parentRef]);

  const [controlledPositionL, setControlledPositionL] = useState({ x: parentOffset.x + 150, y: parentOffset.y + 250 });
  const [controlledPositionR, setControlledPositionR] = useState({ x: parentOffset.x + 250, y: parentOffset.y + 300 });

  const [middleBounds, setMiddleBounds] = useState({
    left: parentOffset.x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2,
    top: parentOffset.y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,
    right: parentOffset.x + parentRef.current.offsetWidth - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 - 20,
    bottom: parentOffset.y + parentRef.current.offsetHeight - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20,
  });

  const customBounds = {
    left: parentOffset.x,
    top: parentOffset.y,
    right: parentOffset.x + parentRef.current.offsetWidth - 20,
    bottom: parentOffset.y + parentRef.current.offsetHeight - 20,
  };

  useEffect(() => {
    setMiddleBounds({
      left: parentOffset.x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2,
      top: parentOffset.y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,
      right: parentOffset.x + parentRef.current.offsetWidth - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 - 20,
      bottom: parentOffset.y + parentRef.current.offsetHeight - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20,
    })
  }, [controlledPositionL, controlledPositionR, parentOffset, parentRef]);

  const onControlledDragL = (e, position) => {
    setControlledPositionL({ x: position.x, y: position.y });
  };

  const onControlledDragR = (e, position) => {
    setControlledPositionR({ x: position.x, y: position.y });
  };

  const onControlledDragMidpoint = (e, position) => {
    setControlledPositionL(prevPosition => ({
      x: prevPosition.x + position.deltaX,
      y: prevPosition.y + position.deltaY
    }));

    setControlledPositionR(prevPosition => ({
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

  const getDirectPoint = () => {
    const h = 40;
    const halfwayPoint = getHalfwayPoint();
    const u = { x: -(controlledPositionR.y - halfwayPoint.y), y: controlledPositionR.x - halfwayPoint.x };
    const len_u = Math.sqrt(u.x * u.x + u.y * u.y);
    const u_norm = { x: u.x * h / len_u, y: u.y * h / len_u };
    return {
      x: halfwayPoint.x + u_norm.x,
      y: halfwayPoint.y + u_norm.y
    }
  };

  const halfwayPoint = getHalfwayPoint();
  const directPoint = getDirectPoint();

  const calculateAngle = () => {
    const dx = controlledPositionR.x - controlledPositionL.x;
    const dy = controlledPositionR.y - controlledPositionL.y;
    const radians = Math.atan2(dy, dx);
    const degrees = radians * (180 / Math.PI);
    return degrees;
  };

  const onDragStop = () => {
    console.log(parentOffset.x, parentOffset.y);
  }

  return (
    <div className="overlay">
      <Draggable position={controlledPositionL} onDrag={onControlledDragL} onStop={onDragStop} bounds={customBounds}>
        <span className="dot" />
      </Draggable>

      <Draggable position={controlledPositionR} onDrag={onControlledDragR} onStop={onDragStop} bounds={customBounds}>
        <span className="dot" />
      </Draggable>

      <Draggable position={halfwayPoint} onDrag={onControlledDragMidpoint} onStop={onDragStop} bounds={middleBounds}>
        <span className="dot" />
      </Draggable>

      <Draggable position={directPoint}>
        <span className="direct_dot" />
      </Draggable>

      <Line
        className="line"
        x0={controlledPositionL.x + 7.5}
        y0={controlledPositionL.y + 7.5}
        x1={controlledPositionR.x + 7.5}
        y1={controlledPositionR.y + 7.5}
        borderColor='#0066CC'
        borderWidth={"5px"}
      />
    </div>
  );
};

export default DragLine;
