import { useState } from "react";
import { useEffect } from "react";

const Listcam = ({ setSelectedCam }) => {
    const [currentCam, setCurrentCam] = useState('');
    const [listCam, setListCam] = useState([
        {id:1, name: 'cam1'}, 
        {id:2, name: 'cam2'}, 
        {id:3, name: 'cam3'}])

    useEffect(() => {
        console.log(currentCam);
    }, [currentCam]);

    const handleSelect = (e) => {
        const value = e.target.value; 
        setSelectedCam(value);
        setCurrentCam(value);
    }
      
    return ( 
        <div className="listcam">
            <select value={currentCam}
            onChange={handleSelect}>
                <option disabled value="">-- Select a camera --</option>
                { 
                listCam.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}
 
export default Listcam;