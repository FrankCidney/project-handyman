import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import './bottomNav.scss';

const BottomNav = () => {
    const [value, setValue] = useState("home");
    // console.log(value);
    const location = useLocation();

    const handleChange = (e, value) => {
        setValue(value);
    }

    return ( 
        <Paper className='bottom-nav'
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
        >
            <BottomNavigation
                // showLabels
                value={value}
                onChange={handleChange}
                className='bottom-nav'
            >
                {(location.pathname !== '/client-requests' && location.pathname !== '/withdraw' && location.pathname !== '/job-listings') && 
                    <>
                    <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/search" value={"home"} sx={{"color": "#f6f6f6"}}/>
                    <BottomNavigationAction icon={<WorkIcon />} component={Link} to="/create-listing" value={"listing"} sx={{"color": "#f6f6f6"}}/>
                    </>
                    }
                    {(location.pathname === '/client-requests') && 
                    <>
                    <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/client-requests" value={"home"} sx={{"color": "#f6f6f6"}}/>
                    <BottomNavigationAction icon={<WorkIcon />} component={Link} to="/job-listings" value={"listing"} sx={{"color": "#f6f6f6"}}/>
                    </>
                    }
                    {(location.pathname === '/withdraw') && 
                    <>
                    <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/client-requests" value={"home"} sx={{"color": "#f6f6f6"}}/>
                    <BottomNavigationAction icon={<WorkIcon />} component={Link} to="/job-listings" value={"listing"} sx={{"color": "#f6f6f6"}}/>
                    </>
                    }
                    {(location.pathname === '/job-listings') && 
                    <>
                    <BottomNavigationAction icon={<HomeIcon />} component={Link} to="/client-requests" value={"home"} sx={{"color": "#f6f6f6"}}/>
                    <BottomNavigationAction icon={<WorkIcon />} component={Link} to="/job-listings" value={"listing"} sx={{"color": "#f6f6f6"}}/>
                    </>
                    }
            </BottomNavigation> 
        </Paper>
     );
}
 
export default BottomNav;