import './navbar.scss';
import Avatar from '@mui/material/Avatar';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
// import ProfileContent from './ProfileContent';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
// import { randomColor } from '../../../helpers';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { NavContext } from '../../../context/NavContext';
import { handleFetch } from '../../../helpers';
// import { handleFetch } from '../../../helpers';

const NavbarHandyman = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    // const location = useLocation();
    // state values
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    // get context values
    const { logout } = useContext(UserContext);
    const { toggleFunc, notifications, clearFunc } = useContext(NavContext);
    
    const markAsRead = () => {
        handleFetch('notifications/mark-as-read', {
            method: 'DELETE'
        }).then(res => {
            if (res === 'deleted') {
                clearFunc();
                setNotifOpen(false);
            }
        }).catch(error => console.log({ markAsReadError: error }));
    }

    return ( 
        <nav className='nav'>
            <div className="icons round">
                <div className="menu-icon"
                    onClick={e => toggleFunc(true)}
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
                <div className="notif-icon icon-divs"
                    onClick={e => setNotifOpen(!notifOpen)}>
                    <NotificationsIcon 
                        sx={{ fontSize: 25
                        }} 
                        className='icon notif' 
                    />
                    {notifications.length !== 0 && 
                    <div className="notif-active">a</div>
                    }
                </div>
                
                
                <div className='icon-divs avatar-icon'
                    onClick={e => setOptionsOpen(!optionsOpen)}>
                    <Avatar className='avatar' 
                        // sx={{backgroundColor: randomColor()}}
                    />
                </div>
                
                
            </div>
            {/* <ProfileContent /> */}
            {/* <div className="options">
                
            </div> */}
            {notifOpen && 
                <div className="notifs-content">
                    {
                        notifications.map(notification => (
                            <p className='notifs'>{notification}</p>
                        ))
                    }
                        <button className='p-base button2'
                            onClick={e => markAsRead()}
                        >
                            Mark as read
                        </button>
                </div>
            }
            {optionsOpen && 
                <div className="options-content">
                    <button className='p-base'
                            onClick={e => navigate('/categories')}
                        >
                            Home
                        </button>
                    {/* <button className='p-base'
                        onClick={e => navigate('/profile/client')}
                    >
                        Profile
                    </button> */}
                    <button className='p-base'
                        onClick={e => {
                            logout();
                            navigate('/');
                        }}
                    >
                        Logout
                    </button>
                </div>
            }
        </nav>
     );
}
 
export default NavbarHandyman;