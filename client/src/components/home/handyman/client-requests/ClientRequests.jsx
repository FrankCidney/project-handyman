import Grid from "@mui/material/Grid";
// import TextField from "@mui/material/TextField";
// import Navbar from "../../../core/navbar/Navbar";
import './clientRequests.scss';
// import Layout from "../../../core/layout/Layout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
// import { io } from "socket.io-client";
import { SocketContext } from "../../../../context/SocketContext";
import { handleFetch } from "../../../../helpers";
import Request from "./client-request/Request";
import { useNavigate } from "react-router-dom";
// import NavbarHandyman from "../../../core/navbar/NavbarHandyman";
import Navbar from "../../../core/navbar/Navbar";
import { useRef } from "react";

const ClientRequests = () => {

    const navigate = useNavigate();
    // set socket values
    const { userId } = useContext(UserContext);
    // console.log({ userId, authenticated });
    const { socket } = useContext(SocketContext);
    
    // set state
    // const [socket, setSocket] = useState(null);
    const [requests, setRequests] = useState([]);
    const [noRequests, setNoRequests] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const isMounted = useRef(false);

    // function to fetch requests and sender info
    const fetchRequestInfo = async () => {
        try {
            const requestData = await handleFetch('notifications/get-requests', { method: 'GET' }, navigate)
            console.log({ requestData });
            return requestData;
            
        } catch (error) {
            console.log(error);
        }
    }

    // function to delete requests when accepted or declined
    const deleteRequest = (requestId) => {
        const filteredReqs = requests.filter(request => request.requestId !== requestId);
        console.log('delete here')
        if (filteredReqs.length === 0) {
            setNoRequests(true);
        } else {
            setRequests(filteredReqs);
        }
    }

    // fetch handyman details on component load
    useEffect(() => {
        handleFetch(`user/details/handyman/${userId}`, {
            method: 'GET'
        }).then(({ coords }) => setCoordinates(coords))
            .catch(error => console.log({ handymanDetailsErr: error }));
    }, [])

    // fetch service requests 
    useEffect(() => {
        if (isMounted.current) {
            fetchRequestInfo()
            .then(requestData => {
                if (requestData === "No requests") {
                    setNoRequests(true);
                } else {
                    requestData?.map(async (request) => {
                        let location = {lng: 0, lat: 0}

                        location.lng = request.senderLocation.coordinates[0];
                        location.lat = request.senderLocation.coordinates[1];
                        const clientData = await handleFetch(`user/details/client/${request.senderId}`, { method: 'GET' })
                            if (!requests.some(req => request._id === req.requestId)) {
                                setRequests(prev => [...prev, {
                                    ...clientData, 
                                    description: request.description,
                                    requestId: request._id,
                                    senderId: request.senderId,
                                    senderLocation: location
                                }].reverse());
                            }

                        console.log(request);
                    })
                }
            });
        } else {
            isMounted.current = true;
        }
        

    }, [coordinates])

    // for live incoming requests
    useEffect(() => {
        socket?.on('getServiceRequest', data => {
            // console.log(data);
            handleFetch(`user/details/client/${data.senderId}`, {
            method: 'GET'
            })
                .then(clientData => {
                    setRequests(prev => 
                        [...prev, {
                        ...clientData, 
                        description: data.description,
                        requestId: data.requestId,
                        senderId: data.senderId,
                        senderLocation: data.senderLocation
                        }].reverse());
                        setNoRequests(false)
                })
                .catch(error => console.log({ clientDetailsError: error }))
    });
    }, [socket])

    return (  
        <>
            <div className="top-content">
                <Navbar />
                {/* <NavbarHandyman /> */}
                <h1 className="page-title">
                Requests
                </h1>
                
            </div>
            <div className="container">
                <Grid container spacing={1}>
                    {
                        noRequests? 
                            <Grid item xs={12} sm={6} md={3}>
                                <div className="no-requests">You currently have no requests</div>
                            </Grid>
                        : requests.map((request, index) => (
                            <Grid item key={index} xs={12} sm={6} md={3}>
                                <Request request={request} coordinates={coordinates} deleteRequest={deleteRequest} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </>
    );
}
 
export default ClientRequests;