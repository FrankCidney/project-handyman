import { useContext, useState } from 'react';
import { SocketContext } from '../../../../../context/SocketContext';
// import { UserContext } from '../../../../../context/UserContext';
import { useOutletContext } from 'react-router-dom';
import './sendRequest.scss';

const Request = () => {
    // get context values
    const { socket } = useContext(SocketContext);
    // const { userId } = useContext(UserContext);
    const { userId, handymanId, userLocation } = useOutletContext();

    const [reqMsg, setReqMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        socket?.emit('sendServiceRequest', {
            senderId: userId,
            receiverId: handymanId,
            description: reqMsg,
            senderLocation: userLocation
        });
    }
    return ( 
        <div className="tab-content">
            <p className="p-base">
                Send service request to handyman
            </p>
            <form className='req-form'
                onSubmit={handleSubmit}
            >
                {/* <label htmlFor="req-msg"></label> */}
                <textarea name="req-msg" id="req-msg" rows="3"
                    placeholder='Write a short description of the service you require'
                    value={reqMsg}
                    onChange={e => setReqMsg(e.target.value)}
                    className='input p-base'
                />
                <button type='submit' className="button">Make offer</button>
            </form>
        </div>
     );
}
 
export default Request;