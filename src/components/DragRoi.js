import React, { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';
import ContextMenu from './ContextMenu'
import { deleteRoi, updateInsertRoi } from '../api/DragRoiApi';

const DragRoi = ({id, parentRef, x, y, points, camId, deleteDragRoi, initLock }) => {
    const [controlledPositions, setControlledPositions] = useState([]);
    const [dotStyle, setDotStyle] = useState("dot_lock");
    const [lock, setLock] = useState(initLock);   

    const reSort = (arrayPositions) => {
        if (arrayPositions.length === 0)
            return;
        let sortedArray = [...arrayPositions].sort((a, b) => {
            if (a.x === b.x) {
                return b.y - a.y; // Sắp xếp giảm dần theo y nếu toạ độ x bằng nhau
            } else {
                return a.x - b.x; // Sắp xếp tăng dần theo x
            }
        });
        const o = sortedArray[0];
        const ccw = (a, b) => {
            let vt_a = { x: a.x - o.x, y: a.y - o.y };
            let vt_b = { x: b.x - o.x, y: b.y - o.y };
            let res = vt_a.x * vt_b.y - vt_a.y * vt_b.x;
            return res;
        };
        sortedArray = sortedArray.sort((a, b) => ccw(a, b)); // Thêm return vào đây
        return sortedArray
    };

    const getPosOnVid = (Point) => {
        return ({x: Point.x - x, y: Point.y - y});
    }
    
    useEffect(() => {
        setDotStyle(lock ? 'dot_lock' : 'dot');
      }, [lock]);
    
    useEffect(() => {
        const sortedPositions = reSort(points.map((point) => (
            {x: x + point.x, y: y + point.y}
        )));
        setControlledPositions(sortedPositions);
    }, [x, y, points]);

    

    const customBounds = {
        left: x,
        top: y,
        right: x + parentRef.current.offsetWidth - 20,
        bottom: y + parentRef.current.offsetHeight - 20,
    };

    const onControlledDrag = (index, draggableData) => {
        const newPositions = [...controlledPositions];
        newPositions[index] = {x: draggableData.x, y: draggableData.y };
        setControlledPositions(newPositions);
    };

    const onDragStop = () => {
        setControlledPositions(reSort(controlledPositions));
        // console.log(parentOffset.x, parentOffset.y);
    }
    const renderEdges = () => {
        if (controlledPositions.length===0)
            return
        let lines = [];
        for (let i = 0; i < 4; i++) {
            let j = (i+1) % 4;
            lines.push(<Line
                className="line"
                key = {i} 
                x0 = {controlledPositions[i].x + 7.5}
                y0 = {controlledPositions[i].y + 7.5}
                x1 = {controlledPositions[j].x + 7.5}
                y1 = {controlledPositions[j].y + 7.5}
                borderColor='#FF0000'
                borderWidth={5}
            />)
        }
        return lines
    }

    const itemClickHandler = async (item) => {
        if (item.caption==="Unlock") {
            setLock(false);
        }
        if (item.caption==="Lock") {
            setLock(true);
            const res = await updateInsertRoi({
            'id': id,
            'camId': camId,
            'points': controlledPositions.map((position) => (getPosOnVid(position))),
            });
            console.log(res.message);
        }
        if (item.caption==="Delete") {
            const res = await deleteRoi({
                'id': id,
                'camId': camId,
                'points': controlledPositions.map((position) => (getPosOnVid(position))),
            });
            console.log(res.message);
            deleteDragRoi(id);
        }
    }

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
            ]}>

                {controlledPositions.map((position, index) => (
                
                    <Draggable key={index} disabled={lock} position={position} onDrag={(e, draggableData) => onControlledDrag(index, draggableData)} onStop={onDragStop} bounds={customBounds}>
                        <span className={dotStyle}/>
                    </Draggable>
                        
                ))}
                {renderEdges()}        
        </ContextMenu>
    </div> 
    );
}
 
export default DragRoi;