// import BottomNav from "../bottom-nav/BottomNav";
// import Navbar from "../navbar/Navbar";
// import Container from "@mui/material/Container";
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
import Drawer from '@mui/material/Drawer';
import { width } from '@mui/system';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // get context values
    const { setSocketValue } = useContext(SocketContext);
    const { userId } = useContext(UserContext);

    // set state
    const [open, setOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [noneActive, setNoneActive] = useState(false);
    const [activeServs, setActiveServs] = useState([]);

    // function to fetch active services
    const fetchActiveServices = async () => {
        try {
            const activeServices = await handleFetch('notifications/activeServices', { method: 'GET' }, navigate)
            return activeServices;
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {       
        
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
                                        activeServiceId: activeService._id
                                        // clientId: activeService.clientId
                                    }]);
                                    // console.log({activeServs})
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
                                    // console.log(handymanData)
                                    // console.log({activeServs})
                                })
                            
                        } catch (error) {
                            console.log(error);
                        }
                    } // end if 1
                }// end if 2
            });

        // setup socket connection
        setSocket(io('http://localhost:8080'));
        
    }, [location.pathname]);

    useEffect(() => {

        // set socket context value
        setSocketValue({ socket });
        socket?.emit('newUser', userId);

        socket?.on('getResponseNotification', data => {
            // console.log(data);
            console.log('received accept response')
            handleFetch(`user/details/handyman/${data.senderId}`, {
            method: 'GET'
            })
                .then(handymanData => {
                    // console.log('after fetch')
                    setActiveServs(prev => 
                        [...prev, {
                        ...handymanData, 
                        description: data.requestDesc,
                        activeServiceId: data.activeServiceId
                        // senderId: data.senderId
                        }]);
                    console.log({ activeServs });
                    setNoneActive(false)
                })
                .catch(error => console.log({ clientDetailsError: error }))
        });
    }, [socket, userId]);
    // useEffect(() => {
    //     console.log({effectNonActive: activeServs})
    // }, [activeServs]);

    const toggleDrawer = (val) => setOpen(val);

    // drawer content
    const drawerContent = (
        <div>
                        
                        {
                            noneActive? 
                                <div className="none-active">No active services</div>
                            : activeServs.map(activeServ => (
                                <div item key={activeServ.activeServeId} >
                                    <ActiveService activeServ={activeServ} />
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
                    variant="temporary"
                    open={open}
                    onClose={(e) => toggleDrawer(false)}
                    onOpen={(e) => toggleDrawer(true)}
                    ModalProps={{
                        keepMounted: true
                    }} 
                    className="drawer"              
                >
                    <div className="container active-serv-container ">
                        <h1 className="drawer-title p1">
                            Active Services
                        </h1>
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
                        children(toggleDrawer)
                    }
                {/* </div> */}
                {/* </Container> */}
            </div>
            {/* <div className="bottom-nav"><BottomNav /></div> */}
        </div>
     );
}
 
export default Layout;