import './hero.scss';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
// import Working from '../../../assets/working.png';

const Hero = ({ myClass }) => {
    return ( 
        <div className="hero">
            <h1 className={`title-logo ${myClass.displayNone}`}>HIRE ME</h1>
            <h2 className={`hero-h2 h2 ${myClass.displayNone}`}>
                In need of a handyman?
            </h2>
            <h1 className={`hero-h1 ${myClass.displayNone}`}>
            Locate handyman service providers anywhere, anytime.
            </h1>
            {/* <div>
                <HomeRepairServiceOutlinedIcon className='tool' />
            </div> */}
            {/* <div className="img-div">
                <img src={Working} alt="icon" className='tool'/>
            </div> */}
            
        </div>
     );
}
 
export default Hero;