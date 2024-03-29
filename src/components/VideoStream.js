import React, { useState, useEffect, useRef } from 'react';
import DragLine from './DragLine';
import test_img from '../test/test_img.jpg';
import Image from 'react-bootstrap/Image';
import { Container } from 'react-bootstrap';

const VideoStream = () => {
    const [dragLines, setDragLines] = useState([]);
    const videoStreamRef = useRef(null);

    useEffect(() => {
        const handleRightClick = (event) => {
            event.preventDefault();
            const menu = document.querySelector(".right-click-menu");
            menu.style.top = `${event.clientY}px`;
            menu.style.left = `${event.clientX}px`;
            menu.classList.add("visible");
        };

        const handleClick = (event) => {
            const menu = document.querySelector(".right-click-menu");
            if (menu.classList.contains("visible")) {
                menu.classList.remove("visible");
            }
        };

        const videoStreamElement = videoStreamRef.current;
        videoStreamElement.addEventListener('contextmenu', handleRightClick);

        // Add a global click event listener to close the context menu
        window.addEventListener('click', handleClick);

        // Cleanup function
        return () => {
            videoStreamElement.removeEventListener('contextmenu', handleRightClick);
            window.removeEventListener('click', handleClick);
        };
    }, []);

    const handleContextMenuAction = (action) => {
        if (action === 'add-boundary') {
            const newDragLine = { key: Date.now() };
            setDragLines([...dragLines, newDragLine]);
        }
        // No need to hide the menu here anymore since `handleClick` will take care of it
    };

    return (
        <Container className="video-stream-container" ref={videoStreamRef}>
            <Image src={test_img} alt="Video Stream" style={{ width: 800, height: 600 }} rounded />
            {dragLines.map(line => (
                <DragLine key={line.key} parentRef={videoStreamRef} />
            ))}
            <Container className="right-click-menu">
                <ul>
                    <li onClick={() => handleContextMenuAction('add-boundary')}>Add Boundary</li>
                </ul>
            </Container>
        </Container>
    );
};

export default VideoStream;