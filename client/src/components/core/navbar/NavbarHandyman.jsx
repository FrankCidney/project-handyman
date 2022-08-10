import './navbar.scss';
import './navbarHandyman.scss';
import Avatar from '@mui/material/Avatar';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

const NavbarHandyman = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    const [open, setOpen] = useState(false);
    const { logout } = useContext(UserContext);

    return ( 
        <nav>
            <h2 className="logo">
                Handy
            </h2>
            <div className="icons">
                <div onClick={e => setOpen(!open)}>
                    <Avatar className='avatar' />
                </div>
                {/* <MenuIcon 
                    sx={{ fontSize: 25 }} 
                    className='icon'    
                /> */}
            </div>
            {open && <div className="profile-content profile-custom">
                        <button className='p-base'
                            onClick={e => navigate('/profile/handyman')}
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
 
export default NavbarHandyman;