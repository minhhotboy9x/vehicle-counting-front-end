import { useState } from "react";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';

const Listcam = ({ setSelectedCam }) => {
    const [currentCam, setCurrentCam] = useState('');
    const [listCam, setListCam] = useState([
        {id:1, name: '1'}, 
        {id:2, name: '2'}, 
        {id:3, name: '3'}])

    useEffect(() => {
        console.log(currentCam);
    }, [currentCam]);

    const handleSelect = (e) => {
        const value = e.target.value; 
        // changeCamera(value);
        setSelectedCam(value);
        setCurrentCam(value);
    }

    return ( 
        <Form.Select aria-label="Default select example" 
            style={{ maxWidth: '250px'}}
            select value={currentCam}
            onChange={handleSelect}>

            <option disabled value="">-- Select a camera --</option>
            {listCam.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                ))}
        </Form.Select>
    );
}
 
export default Listcam;