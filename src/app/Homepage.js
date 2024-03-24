import Navbar from "../components/Navbar";
import Listcam from "../components/Listcam";
import VideoStream from "../components/VideoStream";
import { useState } from "react";

const Homepage = () => {
    const [selectedCam, setSelectedCam] = useState('');
    
    return ( 
        <div className="home">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam}/>
            <VideoStream/>
        </div>
    );
}
 
export default Homepage;