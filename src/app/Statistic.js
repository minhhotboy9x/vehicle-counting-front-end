import Listcam from "../components/Listcam";
import VideoStream from "../components/VideoStream";
import { useState } from "react";

const Statistic = () => {
    const [selectedCam, setSelectedCam] = useState('');
    
    return ( 
        <div className="home">
            <Listcam className='Listcam' setSelectedCam={setSelectedCam}/>
            
        </div>
    );
}
 
export default Statistic;