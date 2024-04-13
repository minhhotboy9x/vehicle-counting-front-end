import Navbar from "../components/Navbar";
import Listcam from "../components/Listcam";
import VideoStream from "../components/VideoStream";
import { useState, useEffect } from "react";

const Homepage = () => {
    const [selectedCam, setSelectedCam] = useState('1');

    return ( 
        <div className="home">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam}/>
            <div className="video-form">
                <VideoStream selectedCam={selectedCam}/>
                {/* Phần tử khác bạn muốn chèn vào đây */}
            </div>
        </div>
    );
}
 
export default Homepage;