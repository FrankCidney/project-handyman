import './request.scss';
// import { Link } from 'react-router-dom';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Avatar from '@mui/material/Avatar';
import MapIcon from '@mui/icons-material/Map';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useContext } from 'react';
import { SocketContext } from '../../../../../context/SocketContext';
import { UserContext } from '../../../../../context/UserContext';
// import { Link } from 'react-router-dom';
import { randomColor } from '../../../../../helpers';

const Request = ({ request, coordinates, deleteRequest }) => {
    const { socket } = useContext(SocketContext);
    const { userId } = useContext(UserContext);
    // console.log(request.senderLocation)
    // console.log(coordinates)

    // on request accept
    const accept = (e) => {
        socket?.emit('sendResponseNotification', {
            senderId: userId,
            receiverId: request.senderId,
            requestDesc: request.description,
            requestId: request.requestId,
            type: 0,
            receiverLocation: { coordinates: [request.senderLocation.lng, request.senderLocation.lat] },
            senderLocation: { coordinates }
        });
        console.log('accept event emitted');
        deleteRequest(request.requestId);
    }
    // on request decline
    const decline = () => {
        socket?.emit('sendResponseNotification', {
            senderId: userId,
            receiverId: request.senderId,
            requestDesc: request.description,
            requestId: request.requestId,
            type: 1
        });
        console.log('decline event emitted');
        deleteRequest(request.requestId);
    }

    return ( 
        <div className="request">
            <div className="avatar-div">
                <Avatar className='avatar'
                    // sx={{backgroundColor: randomColor()}}
                    sx={{backgroundColor: '#88888'}}
                >
                    {request.clientName[0].toUpperCase()}
                </Avatar>
            </div>
            <div className='request-content'>
                <p className='p-base p-top'>{request.clientName}, {request.clientPhone}</p>
                <p className='p2'>{request.description}</p>
                <div className="map-phone">
                    <a href={`tel:${request.clientPhone}`}
                        className="phone"
                    >
                        <LocalPhoneIcon className='mp-icons mp-icons-first'/>
                    </a>
                    <a href={`https://www.google.com/maps/dir/?api=1&origin=${coordinates[1]}%2C${coordinates[0]}&destination=${request.senderLocation?.lat}%2C${request.senderLocation?.lng}`} 
                    className="map">
                        <MapIcon className='mp-icons'/>
                    </a>
                </div>
                <div className='actions'>
                    <button className="button2 btn-action"
                        onClick={accept}
                    >Accept</button>
                    <button className="button2 btn-action"
                        onClick={decline}
                    >Decline</button>
                </div>
            </div>
        </div>
     );
}
 
export default Request;