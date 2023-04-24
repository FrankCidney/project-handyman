import Navbar from "../../../core/navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import '../../profiles.scss';
// import Layout from "../../../core/layout/Layout";
import { UserContext } from '../../../../context/UserContext';
import { handleFetch, randomColor } from "../../../../helpers";

const HandymanClientView = () => {

    let params = useParams();
    const [searchParams] = useSearchParams();
    const { userId } = useContext(UserContext);

    // get user coordinates from query params
    const userLng = searchParams.get('userLng');
    const userLat = searchParams.get('userLat');
    const userLocation = {
        coordinates: [userLng, userLat]
    }
    // console.log(userId);
    console.log(searchParams.get('userLng'));
    console.log(searchParams.get('userLat'));

    const [value, setValue] = useState(0);
    const [ratingActive, setRatingActive] = useState(true);
    const [handymanDetails, setHandymanDetails] = useState({
        handymanName: '',
        handymanNo: ''
    });

    // function to activate rating
    const activateRating = () => {
        setRatingActive(true);
    }

    // function to lock rating
    const deactivateRating = () => {
        setRatingActive(false);
    }
    // console.log(value);

    // on tab change
    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    // fetch handyman details on component load
    useEffect(() => {
        handleFetch(`user/details/handyman/${params.handymanId}`, {
            method: 'GET'
        })
            .then(({ handymanName, handymanNo }) => {
                setHandymanDetails({ handymanName, handymanNo })
            })
            .catch(error => console.log({handymanDetailsFetchError: error}));
    },[])

    return (  
        <>
            <div className="top-content">
                <Navbar />
                <div className="wrapper">
                    
                    <div className="main-content">
                        <Avatar className='avatar'
                            sx={{backgroundColor: randomColor()}}
                        >
                            {handymanDetails?.handymanName[0]?.toUpperCase()}
                        </Avatar>
                        <h4 className="p1">{ handymanDetails.handymanName }</h4>
                        {/* <h5 className="p2">Location goes here</h5> */}
                        <h5 className="p2 p-overide">{ handymanDetails.handymanNo }</h5>
                        <button className="button2 btn-custom">
                            <a href={`tel:${handymanDetails.handymanNo}`}>
                                Call
                            </a>
                        </button>
                    </div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant={"fullWidth"}
                        className='tabs'
                    >
                        <Tab label="Request" component={Link} to="send-request" value={0} className='p-base' />
                        <Tab label="Payment" component={Link} to="payment" value={1} className='p-base' />
                        <Tab label="Rating" component={Link} to="rate" value={2} className='p-base' />
                    </Tabs>
                </div>
            </div>
            <div className="container outlet">
                <div className="wrapper">
                    <Outlet context={{ 
                        userId, 
                        handymanId: params.handymanId,
                        activateRating,
                        ratingActive,
                        deactivateRating,
                        userLocation
                    }}/>
                </div>
            </div>
        </>
    );
}
 
export default HandymanClientView;