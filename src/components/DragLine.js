import React, { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';
import ContextMenu from './ContextMenu'
import { deleteBoundary, updateInsertBoundary, getBoundaryProperty } from '../api/DragLineApi';


const DragLine = ({id, parentRef, x, y, pointL, pointR, camId, deleteDragLine, initLock, setProperty }) => {
  const [controlledPositionL, setControlledPositionL] = useState({});
  const [controlledPositionR, setControlledPositionR] = useState({});
  
  const [dotStyle, setDotStyle] = useState("dot_lock")

  const [lock, setLock] = useState(initLock);

  const [middleBounds, setMiddleBounds] = useState({
    left: x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2,
    top: y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,
    right: x + parentRef.current.offsetWidth - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 - 20,
    bottom: y + parentRef.current.offsetHeight - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20,
  });

  const getPosOnVid = (Point) => {
    return ({x: Point.x - x, y: Point.y - y});
  }
  
  const customBounds = {
    left: x,
    top: y,
    right: x + parentRef.current.offsetWidth - 20,
    bottom: y + parentRef.current.offsetHeight - 20,
  };

  useEffect(() => {
    setControlledPositionL({ x: x + pointL.x, y: y + pointL.y });
    setControlledPositionR({ x: x + pointR.x, y: y + pointR.y });
  }, [x, y, pointL, pointR])

  useEffect(() => {
    setMiddleBounds({
      left: x + Math.abs(controlledPositionR.x - controlledPositionL.x) / 2,
      top: y + Math.abs(controlledPositionR.y - controlledPositionL.y) / 2,
      right: x + parentRef.current.offsetWidth - Math.abs(controlledPositionR.x - controlledPositionL.x) / 2 - 20,
      bottom: y + parentRef.current.offsetHeight - Math.abs(controlledPositionR.y - controlledPositionL.y) / 2 - 20,
    })
  }, [x, y, controlledPositionL, controlledPositionR, parentRef]);

  useEffect(() => {
    setDotStyle(lock ? 'dot_lock' : 'dot');
  }, [lock]);

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

  const onDragStop = () => {
    // console.log(id, getPosOnVid(controlledPositionL), getPosOnVid(controlledPositionR), camId);
  }

  const itemClickHandler = async (item) => {
    if (item.caption==="Unlock") {
      setLock(false);
    }

    if (item.caption==="Lock") {
      setLock(true);
      const res = await updateInsertBoundary({
        'id': id,
        'camId': camId,
        'pointL': getPosOnVid(controlledPositionL),
        'pointR': getPosOnVid(controlledPositionR),
        'pointDirect': getPosOnVid(directPoint)
      });
      console.log(res.message);
    }

    if (item.caption==="Delete") {
      const res = await deleteBoundary({
        "id": id, 
        "camId": camId,
      });
      setProperty(null);
      console.log(res.message);
      deleteDragLine(id);
    }

    if (item.caption==="Property") {
      const res = await getBoundaryProperty({
        "id": id,
        "camId": camId
      })
      let boundary = res['boundaries'][0];
      boundary = {...{type: "boundary"} , ...boundary}
      // console.log(boundary);
      setProperty(boundary);
    }
  }

  // const handleDragLineClick = (event) => {
  //   console.log("clicked dragline")
  // };

  return (
    <div className="overlay">
      <ContextMenu 
        id={id} 
        onItemClicked={itemClickHandler}
        items={[
          {
            id: "1",
            caption: lock?"Unlock":"Lock",
          },
          {
            id: "2",
            caption: "Delete",
          },
          {
            id: "3",
            caption: "Property",
          },

        ]}>
        <Draggable disabled={lock} position={controlledPositionL} onDrag={onControlledDragL} onStop={onDragStop} bounds={customBounds}>
          <span className={dotStyle} />
        </Draggable>

        <Draggable disabled={lock} position={controlledPositionR} onDrag={onControlledDragR} onStop={onDragStop} bounds={customBounds}>
          <span className={dotStyle} />
        </Draggable>

        <Draggable disabled={lock} position={halfwayPoint} onDrag={onControlledDragMidpoint} onStop={onDragStop} bounds={middleBounds}>
          <span className={dotStyle} />
        </Draggable>
        
        {/* 
        <Draggable disabled={true} position={directPoint}>
          <span className="direct_dot" onClick={handleDragLineClick}/>
        </Draggable> */}

        <Line
          className="line"
          x0={controlledPositionL.x + 7.5}
          y0={controlledPositionL.y + 7.5}
          x1={controlledPositionR.x + 7.5}
          y1={controlledPositionR.y + 7.5}
          borderColor='#0066CC'
          borderWidth={5}
        />
      </ContextMenu>
    </div>
  );
};

export default DragLine;