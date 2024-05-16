import React, { useEffect, useState } from 'react';
import { Line } from 'react-lineto';
import Draggable from 'react-draggable';
import ContextMenu from './ContextMenu'
import { deleteRoi, updateInsertRoi, getRoiProperty } from '../api/DragRoiApi';

const DragRoi = ({ id, parentRef, x, y, points, camId, deleteDragRoi, initLock, setProperty }) => {
    const [controlledPositions, setControlledPositions] = useState([]);
    const [dotStyle, setDotStyle] = useState("dot_lock");
    const [lock, setLock] = useState(initLock);

    const getPosOnVid = (Point) => {
        return ({ x: Point.x - x, y: Point.y - y });
    }

    useEffect(() => {
        setDotStyle(lock ? 'dot_lock' : 'dot');
    }, [lock]);

    useEffect(() => {
        const sortedPositions = points.map((point) => (
            { x: x + point.x, y: y + point.y }
        ));
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
        newPositions[index] = { x: draggableData.x, y: draggableData.y };
        setControlledPositions(newPositions);
    };

    const onDragStop = () => {
        // setControlledPositions(reSort(controlledPositions));
        // console.log(parentOffset.x, parentOffset.y);
    }
    const renderEdges = () => {
        if (controlledPositions.length === 0)
            return
        let lines = [];
        for (let i = 0; i < 4; i++) {
            let j = (i + 1) % 4;
            lines.push(<Line
                className="line"
                key={i}
                x0={controlledPositions[i].x + 7.5}
                y0={controlledPositions[i].y + 7.5}
                x1={controlledPositions[j].x + 7.5}
                y1={controlledPositions[j].y + 7.5}
                borderColor='#FF0000'
                borderWidth={5}
            />)
        }
        return lines
    }

    const itemClickHandler = async (item) => {
        if (item.caption === "Unlock") {
            setLock(false);
        }

        if (item.caption === "Lock") {
            setLock(true);
            const res = await updateInsertRoi({
                'id': id,
                'camId': camId,
                'points': controlledPositions.map((position) => (getPosOnVid(position))),
            });
            console.log(res.message);
           
        }

        if (item.caption === "Delete") {
            const res = await deleteRoi({
                'id': id,
                'camId': camId,
                'points': controlledPositions.map((position) => (getPosOnVid(position))),
            });
            console.log(res.message);
            deleteDragRoi(id);
        }

        if (item.caption === "Property") {
            const res = await getRoiProperty({
                "id": id,
                "camId": camId
            });
            let roi = res['rois'][0];
            roi = { ...{ type: "roi" }, ...roi }
            // console.log(roi);
            setProperty(roi);
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
                        caption: lock ? "Unlock" : "Lock",
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

                {controlledPositions.map((position, index) => (

                    <Draggable key={index} disabled={lock} position={position} onDrag={(e, draggableData) => onControlledDrag(index, draggableData)} onStop={onDragStop} bounds={customBounds}>
                        <span className={dotStyle} />
                    </Draggable>

                ))}
                {renderEdges()}
            </ContextMenu>
        </div>
    );
}

export default DragRoi;