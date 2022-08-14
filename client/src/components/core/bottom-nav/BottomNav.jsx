import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link } from "react-router-dom";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import './bottomNav.scss';

const BottomNav = () => {
    const [value, setValue] = useState("home");
    // console.log(value);

    const handleChange = (e, value) => {
        setValue(value);
    }

    return ( 
        <div className='bottom-nav'>
            <BottomNavigation
                // showLabels
                value={value}
                onChange={handleChange}
                className='bottom-nav'
            >
                <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/categories" value={"home"} />
                <BottomNavigationAction icon={<SearchIcon />} component={Link} to="/search" value={"search"} />
                <BottomNavigationAction icon={<LocationOnIcon />} component={Link} to="/map" value={"map"} />
            </BottomNavigation> 
        </div>
     );
}
 
export default BottomNav;