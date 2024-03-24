import Listcam from "./Listcam";
import VideoStream from "./video/VideoStream";
import { useEffect, useState } from "react";
const Mainbox = () => {
    const [selectedCam, setSelectedCam] = useState('');
    
    return ( 
        <div className="main-body">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam}/>
            <VideoStream/>
        </div>
    );
}
 
export default Mainbox;