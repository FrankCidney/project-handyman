import './activeService.scss';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { randomColor } from '../../../../helpers';

const ActiveService = ({ activeServ }) => {

    const navigate = useNavigate();
    const viewMap = () => {}
    const call = () => {}
    const handleActiveServ = (e) => {
        navigate(`/profile/handyman-client-view/${activeServ.handymanId}`)
    }
    return ( 
        <>
        
        {activeServ.handymanName && 
            <div className="request active-serv-wrapper" onClick={handleActiveServ}>
                <div className="avatar-div">
                    <Avatar className='avatar'
                        sx={{backgroundColor: randomColor()}}
                    >
                        {activeServ.handymanName[0].toUpperCase()}
                    </Avatar>
                </div>
                <div className='request-content active-serv-content'>
                    <p className='p-base p-top p-serv'>{activeServ.handymanName}, {activeServ.handymanPhone}</p>
                    <p className='p2 p-serv'>{activeServ.description}</p>
                    {/* <div className="map-phone">
                        <LocalPhoneIcon className='mp-icons mp-icons-first'/>
                        <MapIcon className='mp-icons'/>
                        
                    </div> */}
                    {/* <div className='actions'>
                        <button className="button2 btn-action"
                            onClick={viewMap}
                        >Location</button>
                        <button className="button2 btn-action"
                            onClick={call}
                        >Call</button>
                    </div> */}
                </div>
            </div>
        }

        {activeServ.clientName && 
            <div className="request active-serv-wrapper">
                <div className="avatar-div">
                    <Avatar className='avatar'
                        sx={{backgroundColor: randomColor()}}
                    >
                        {activeServ.clientName[0].toUpperCase()}
                    </Avatar>
                </div>
                <div className='request-content active-serv-cont'>
                    <p className='p-base p-top p-serv'>{activeServ.clientName}, {activeServ.clientPhone}</p>
                    <p className='p2 p-serv'>{activeServ.description}</p>
                    {/* <div className="map-phone">
                        <LocalPhoneIcon className='mp-icons mp-icons-first'/>
                        <MapIcon className='mp-icons'/>
                        
                    </div> */}
                    <div className='actions serv-actions'>
                        <button className="button2 btn-action"
                            onClick={viewMap}
                        >Location</button>
                        <button className="button2 btn-action"
                            onClick={call}
                        >Call</button>
                    </div>
                </div>
            </div>
        }

        </>
    );
}
 
export default ActiveService;