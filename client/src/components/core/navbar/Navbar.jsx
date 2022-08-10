import './navbar.scss';
import Avatar from '@mui/material/Avatar';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
// import ProfileContent from './ProfileContent';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
// import { randomColor } from '../../../helpers';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    // const location = useLocation();
    const [open, setOpen] = useState(false);
    const { logout } = useContext(UserContext);

    return ( 
        <nav className='nav'>
            <div className="icons">
                <div className="menu-icon"
                    onClick={e => toggleDrawer(true)}
                    >
                        <MenuIcon 
                            sx={{ fontSize: 25 }} 
                            className='icon'    
                        />
                </div>
                <h2 className="logo icon-divs">
                    Hire Me
                </h2>
            </div>

            <div className='icons'>
                <div className="notif-icon icon-divs">
                    <NotificationsIcon 
                        sx={{ fontSize: 25
                        }} 
                        className='icon notif' 
                    />
                </div>
                
                <div className='icon-divs'
                    onClick={e => setOpen(!open)}>
                    <Avatar className='avatar' 
                        // sx={{backgroundColor: randomColor()}}
                    />
                </div>
                
                
            </div>
            {/* <ProfileContent /> */}
            {/* <div className="options">
                
            </div> */}
            {open && <div className="profile-content">
                        <button className='p-base'
                            onClick={e => navigate('/profile/client')}
                        >
                            View profile
                        </button>
                        <button className='p-base'
                            onClick={e => {
                                logout();
                                navigate('/');
                            }}
                        >
                            Logout
                        </button>
                    </div>}
        </nav>
     );
}
 
export default Navbar;