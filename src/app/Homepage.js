import Navbar from "../components/Navbar";
import Listcam from "../components/Listcam";
import VideoStream from "./video/VideoStream";

const Homepage = () => {
    const [selectedCam, setSelectedCam] = useState('');
    
    return ( 
        <div className="home">
            <Navbar/>
            <Listcam className='Listcam' setSelectedCam={setSelectedCam}/>
            <VideoStream/>
        </div>
    );
}
 
export default Homepage;