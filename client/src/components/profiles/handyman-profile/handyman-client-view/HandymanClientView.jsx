import Navbar from "../../../core/navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import '../../profiles.scss';
// import Layout from "../../../core/layout/Layout";
import { UserContext } from '../../../../context/UserContext';

const HandymanClientView = ({ toggleDrawer }) => {

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
    // console.log(searchParams.get('userLng'));
    // console.log(searchParams.get('userLat'));

    const [value, setValue] = useState(0);
    const [ratingActive, setRatingActive] = useState(false);

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

    return (  
        <>
            <div className="top-content">
                <Navbar toggleDrawer={toggleDrawer}/>
                <div className="wrapper">
                    
                    <div className="main-content">
                        <Avatar className="avatar" />
                        <h4 className="p1">Name goes here</h4>
                        <h5 className="p2">Location goes here</h5>
                        <h5 className="p2 p-overide">Phone number goes here</h5>
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