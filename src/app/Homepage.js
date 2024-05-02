import Listcam from "../components/Listcam";
import VideoStream from "../components/VideoStream";
import DragLineProps  from "../components/DragLineProps"
import { useState, useEffect } from "react";

const Homepage = () => {
    const [selectedCam, setSelectedCam] = useState('1');
    const [property, setProperty] = useState(null);

    return (
        <div className="home">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam} />
            <div className="video-form">
                <VideoStream selectedCam={selectedCam} setProperty={setProperty} />
                {property && <DragLineProps props={property} setProperty={setProperty}/>}
            </div>
        </div>
    );
}

export default Homepage;