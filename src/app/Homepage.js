import Listcam from "../components/Listcam";
import VideoStream from "../components/VideoStream";
import DragLineProps from "../components/DragLineProps"
import DragRoiProps from "../components/DragRoiProps";
import { useState, useEffect } from "react";

const Homepage = () => {
    const [selectedCam, setSelectedCam] = useState('1');
    const [property, setProperty] = useState(null);

    return (
        <div className="home">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam} />
            <div className="video-form">
                <VideoStream selectedCam={selectedCam} setProperty={setProperty} />
                {property &&
                    (
                        property.type === 'boundary' ?
                            <DragLineProps props={property} setProperty={setProperty} />
                            : <DragRoiProps props={property} setProperty={setProperty} />
                    )}
            </div>
        </div>
    );
}

export default Homepage;