import BottomNav from "../bottom-nav/BottomNav";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import './layout.scss';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContext } from "react";
import { SocketContext } from "../../../context/SocketContext";
import { UserContext } from "../../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { handleFetch } from "../../../helpers";
import ActiveService from "./active-service/ActiveService";
import { NavContext } from "../../../context/NavContext";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Drawer from '@mui/material/Drawer';
// import { width } from '@mui/system';
import IconButton from '@mui/material/IconButton';
// import HomeIcon from "@mui/icons-material/Home";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // get context values
    const { setSocketValue } = useContext(SocketContext);
    const { userId } = useContext(UserContext);
    const { drawerVal, toggleFunc, notificationFunc } = useContext(NavContext);

    // set state
    // const [open, setOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [noneActive, setNoneActive] = useState(false);
    const [activeServs, setActiveServs] = useState([]);
    // const [locationState, setLocationState] = useState('');
    // const [notifications, setNotifications] = useState([]);

    // function to fetch active services
    const fetchActiveServices = async () => {
        try {
            const activeServices = await handleFetch('notifications/activeServices', { method: 'GET' }, navigate)
            return activeServices;
        } catch (error) {
            console.log(error)
        }
        
    }
    
    // get notifications on component load
    useEffect(() => {
    if (location.pathname === '/categories') {

            handleFetch('notifications/get-notifications', {
            method: 'GET'
            }).then(notifs => notifs.map(notif => {
            
            handleFetch(`user/details/handyman/${notif.senderId}`, {
                method: 'GET'
                })
                    .then(handymanData => {
                        // accepted request notification to client
                        if (notif.type === 0) {
                            notificationFunc(`${handymanData.handymanName} accepted your request`)
                        }
                        // declined request notification to client
                        if (notif.type === 1) {
                            notificationFunc(`${handymanData.handymanName} declined your request`)
                        }
                    })
                    .catch(error => console.log({ handymanDetailsError: error })); 
                }))
            .catch(error => console.log({ notificationsFetchError: error }));
            }
            
    }, []);

    useEffect(() => {       
        // fetch active services
        fetchActiveServices()
            .then((activeServices) => {
                
                if (activeServices === "No active services") {
                    setNoneActive(true);
                } else {
                    
                    // if in handyman page
                    if (location.pathname === '/client-requests') {
                        try {
                            
                                activeServices?.map(async (activeService) => {
                                    const clientData = await handleFetch(`user/details/client/${activeService.clientId}`, { method: 'GET' })
                                    setActiveServs(prev => [...prev, {
                                        ...clientData, 
                                        description: activeService.description,
                                        activeServiceId: activeService._id,
                                        clientLocation: activeService.clientLocation,
                                        handymanLocation: activeService.handymanLocation
                                    }]);
                                })
                            
                        } catch (error) {
                            console.log(error);
                        }
                        
                    } // end if 1

                    // if in client page
                    if (location.pathname === '/categories') {
                        try {
                    
                                activeServices?.map(async (activeService) => {
                                    const handymanData = await handleFetch(`user/details/handyman/${activeService.handymanId}`, { method: 'GET' })
                                    setActiveServs(prev => [...prev, {
                                        ...handymanData, 
                                        description: activeService.description,
                                        activeServiceId: activeService._id,
                                        handymanId: activeService.handymanId
                                    }]);
                                })
                            
                        } catch (error) {
                            console.log(error);
                        }
                    } // end if 1
                }// end if 2
            });

        // setup socket connection
        setSocket(io(`${process.env.REACT_APP_SERVER_URL}`));
        
    }, []);

    useEffect(() => {

        // set socket context value
        setSocketValue({ socket });
        socket?.emit('newUser', userId);

        socket?.on('getResponseNotification', data => {

            handleFetch(`user/details/handyman/${data.senderId}`, {
            method: 'GET'
            })
                .then(handymanData => {
                    
                    if (data.type === 0) {
                        setActiveServs(prev => 
                            [...prev, {
                            ...handymanData, 
                            description: data.requestDesc,
                            activeServiceId: data.activeServiceId
                            }]);

                        setNoneActive(false)
                        console.log('accepted response');
                        notificationFunc(`${handymanData.handymanName} accepted your request`);
                    }

                    if (data.type === 1) {
                        console.log('declined response');
                        notificationFunc(`${handymanData.handymanName} declined your request`);
                    }

                    
                })
                .catch(error => console.log({ clientDetailsError: error }))
        });
    }, [socket, userId]);

    // function to remove active service when end button is clicked
    const endActiveService = (serviceId) => {
        const filteredServs = activeServs.filter(service => service.activeServiceId !== serviceId);
        if (filteredServs.length === 0) {
            setNoneActive(true);
        } else {
            setActiveServs(filteredServs);
        }
    }

    // drawer content
    const drawerContent = (
                    <div>
                        
                        {
                            noneActive? 
                                <div className="none-active">No active services</div>
                            : activeServs.map(activeServ => (
                                <div item key={activeServ.activeServiceId} >
                                    <ActiveService activeServ={activeServ} 
                                        endActiveService={endActiveService} 
                                    />
                                </div>
                            ))
                        }
                    
                    </div>
    )

    return ( 
        <div className="layout">
            <div className="drawer-div ">
                <SwipeableDrawer
                    anchor="left"
                    open={drawerVal}
                    onClose={(e) => toggleFunc(false)}
                    onOpen={(e) => toggleFunc(true)}
                    ModalProps={{
                        keepMounted: true
                    }} 
                    PaperProps={{
                        sx: {
                            background: '#FAFAFA'
                        }
                    }}
                    className="drawer"              
                >
                    <div className="container active-serv-container ">
                        <div className="drawer-top">
                            <h1 className="drawer-title p1">
                                Active Services
                            </h1>
                            <IconButton
                                onClick={(e) => toggleFunc(false)}
                            >
                                <ArrowBackIcon className="arrowBackIcon"/>
                            </IconButton>
                        </div>
                        
                        {/* <hr /> */}
                        { drawerContent }
                    </div>
                </SwipeableDrawer>
                {/* <Drawer
                    anchor="left"
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' }
                    }}
                    open
                >
                    { drawerContent }
                </Drawer> */}

            </div>
            {/* <div className="navbar top-content">
                <Container>
                    <Navbar />
                </Container>
            </div> */}
            <div className="content-holder">
                {/* <Container> */}
                {/* <div className="container"> */}
                    {
                        children()
                    }
                {/* </div> */}
                {/* </Container> */}
            </div>
            
            {/* <div className="bottom-nav"><BottomNav /></div> */}
        </div>
     );
}
 
export default Layout;