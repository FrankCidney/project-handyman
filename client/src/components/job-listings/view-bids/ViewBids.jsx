import Avatar from '@mui/material/Avatar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Rating from '@mui/material/Rating';
import { handleFetch, randomColor } from '../../../helpers';
import './viewBid.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../context/SocketContext';
import { UserContext } from '../../../context/UserContext';

const ViewBids = ({ jobId }) => {

    let params = useParams();
    const{ socket } = useContext(SocketContext);
    const { userId, defaultLocation } = useContext(UserContext);
    const [bids, setBids] = useState([]);

    // if bid is accepted
    const accept = (bid) => {
        socket?.emit('sendBidAccept', {
            clientId: userId,
            handymanNumId: bid.handymanDetails.id,
            bidDesc: bid.bidDescription,
            type: 0,
            handymanLocation: { coordinates: [] },
            clientLocation: { coordinates: defaultLocation.coordinates }
        });
        console.log('accept event emitted');
        
    }

        // get bids for the job on page load
        useEffect(() => {
            handleFetch(`jobs/client/get-bids/${jobId}`, {
                method: 'GET'
            })
            .then(bids => setBids(bids))
            .catch(error => console.log(error));
        }, [bids]);

    return ( 
        bids.map(bid => (
        <div className="request view-bids">
            <div className="avatar-div">
                <Avatar className='avatar'
                    // sx={{backgroundColor: randomColor()}}
                    sx={{backgroundColor: '#88888'}}
                >
                    {bid.handymanDetails.username[0].toUpperCase()}
                </Avatar>
            </div>
            <div className='request-content bid-content'>
                <div className="name-bid">
                    <p className='p-base p-top'>{bid.handymanDetails.username}</p>
                    <p className="price">Ksh {bid.bidPrice}</p>
                </div>
                <p className='p2'>{bid.bidDescription}
                </p>
                <div className="dist-phone">
                    <a 
                        className="phone"
                    >
                        <LocalPhoneIcon className='mp-icons mp-icons-first'/>
                    </a>
                    <p className="dist">{(bid.handymanDetails.distance >= 1000)? 
                    Math.round(bid.handymanDetails.distance / 1000 * 2) / 2 + " km":
                    Math.round(bid.handymanDetails.distance) + " m"
                    }</p>
                </div>
                <div className="rev-rating">
                    <Rating 
                        name='half-rating'
                        value={bid.handymanDetails.rating}
                        precision={0.5}
                        className="stars"
                        size='small'
                        readOnly
                    />
                    <p className="num-reviews">
                        ({bid.handymanDetails.ratingCount} reviews)
                    </p>
                </div>
                
                    <button className="button b-custom"
                        onClick={(e) => accept(bid)}
                    >Accept</button>
                
            </div>
        </div>
        ))
     );
}
 
export default ViewBids;