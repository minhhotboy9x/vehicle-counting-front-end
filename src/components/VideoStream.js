import React, { useState, useEffect, useRef } from 'react';
import DragLine from './DragLine';
import test_img from '../test/test_img.jpg';

const VideoStream = () => {
    const [dragLines, setDragLines] = useState([]); // Sử dụng mảng để quản lý các DragLine
    const videoStreamRef = useRef(null);

    useEffect(() => {
      const preventDefaultRightClick = (event) => {
        event.preventDefault(); // prevents the default context menu from showing
        const menu = document.querySelector(".right-click-menu");
        // Position the custom context menu
        menu.style.top = `${event.clientY}px`;
        menu.style.left = `${event.clientX}px`;
        menu.classList.add("visible");
      };

      const videoStreamElement = videoStreamRef.current;
      videoStreamElement.addEventListener('contextmenu', preventDefaultRightClick);

      // Clean-up function
      return () => {
        videoStreamElement.removeEventListener('contextmenu', preventDefaultRightClick);
      };
    }, []);

    const handleContextMenuAction = (action) => {
      const menu = document.querySelector(".right-click-menu");
      menu.classList.remove("visible"); // Hide the custom context menu
      if (action === 'add-boundary') {
        const newDragLine = { key: Date.now() }; // Tạo DragLine mới với unique key
        setDragLines([...dragLines, newDragLine]); // Thêm DragLine mới vào mảng
      }
    };

    return (
        <div className="video-stream-container" ref={videoStreamRef}>
            <img src={test_img} alt="Video Stream" style={{ width: 640, height: 480 }} />
            {dragLines.map(line => (
                <DragLine key={line.key} parentRef={videoStreamRef} /> // Sử dụng key cho mỗi DragLine
            ))}
            <div className="right-click-menu">
              <ul>
                <li onClick={() => handleContextMenuAction('add-boundary')}>Add Boundary</li>
              </ul>
            </div>
        </div>
    );
};

export default VideoStream;