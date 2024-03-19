import Listcam from "./Listcam";
import { useEffect, useState } from "react";
const Mainbox = () => {
    const [selectedCam, setSelectedCam] = useState('');
    
    return ( 
        <div className="main-body">
            <Listcam setSelectedCam={setSelectedCam}/>
        </div>
    );
}
 
export default Mainbox;