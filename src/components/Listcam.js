import { useState } from "react";
import { useEffect } from "react";

const Listcam = ({ setSelectedCam }) => {
    const [currentCam, setCurrentCam] = useState('');
    const [listCam, setListCam] = useState([
        {id:1, name: '1'}, 
        {id:2, name: '2'}, 
        {id:3, name: '3'}])

    useEffect(() => {
        // console.log(currentCam);
    }, [currentCam]);

    const handleSelect = (e) => {
        const value = e.target.value; 
        // changeCamera(value);
        setSelectedCam(value);
        setCurrentCam(value);
    }
    
    // Hàm để thay đổi camera
    /*
    const changeCamera = async (newCamId) => {
        try {
            const response = await fetch('/change_cam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cam_id: newCamId })
            });
            if (response.ok) {
                // Nếu request thành công, cập nhật state với URL mới từ response
                const data = await response.json();
                setVideoFeedUrl(data.videoFeedUrl);
            } else {
                console.error('Failed to change camera');
            }
        } catch (error) {
            console.error('Error changing camera:', error);
        }
    };
    */

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