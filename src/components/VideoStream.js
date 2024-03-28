import React, { useState, useEffect, useRef } from 'react';
import DragLine from './DragLine';

const VideoStream = () => {
    const [videoFeedUrl, setVideoFeedUrl] = useState(process.env.REACT_APP_TestStreaming);
    const [showDragLine, setShowDragLine] = useState(false);
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
      if (action === 'toggle-drag-line') {
        setShowDragLine(!showDragLine);
      }
      // Hide the custom context menu
      const menu = document.querySelector(".right-click-menu");
      menu.classList.remove("visible");
    };

    return (
        <div className="video-stream-container" ref={videoStreamRef}>
            <img src={videoFeedUrl} alt="Video Stream" style={{ width: 640, height: 480 }} />
            {showDragLine && <DragLine parentRef={videoStreamRef}/>}
            <div className="right-click-menu">
              <ul>
                <li onClick={() => handleContextMenuAction('toggle-drag-line')}>Toggle Drag Line</li>
              </ul>
            </div>
        </div>
    );
};

export default VideoStream;