import React from 'react';

const VideoStream = () => {
    // Replace the URL with the actual endpoint of your Flask video_feed
    const videoFeedUrl = process.env.REACT_APP_TestStreaming ;
    return (
        <img src={videoFeedUrl} alt="Video Stream" style={{ width: 640, height: 480 }}  />
    );
};

export default VideoStream;