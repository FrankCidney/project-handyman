import './activeService.scss';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { handleFetch, randomColor } from '../../../../helpers';
import { useContext } from 'react';
import { NavContext } from '../../../../context/NavContext';

const ActiveService = ({ activeServ, endActiveService }) => {

    const navigate = useNavigate();
    // context values
    const { toggleFunc } = useContext(NavContext);

    console.log(activeServ);
    // view handyman profile from active service
    const handleActiveServ = (e) => {
        navigate(`/profile/handyman-client-view/${activeServ.handymanId}`);
        toggleFunc(false);
    }

    // end service function
    const endService = (e) => {
        handleFetch(`notifications/end-active-service/${activeServ.activeServiceId}`, {
            method: 'DELETE'
        }).then(res => {
            if (res === 'deleted') {
                endActiveService(activeServ.activeServiceId);
            }
        }).catch(error => console.log({ endActiveServiceError: error }));
    }
    return ( 
        <>
        
        {activeServ.handymanName && 
            <div className="request active-serv-wrapper">
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

                    <div className='actions serv-actions'>
                        <button className="button2 btn-action"
                            onClick={handleActiveServ}
                        >View</button>
                        <button className="button2 btn-action"
                            onClick={endService}
                        >End</button>
                    </div>
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
                        <button className="button2 btn-action">
                            <a href={`https://www.google.com/maps/dir/?api=1&origin=${activeServ.handymanLocation.coordinates[1]}%2C${activeServ.handymanLocation.coordinates[0]}&destination=${activeServ.clientLocation.coordinates[1]}%2C${activeServ.clientLocation.coordinates[0]}`}
                            >
                                Location
                            </a>
                        </button>
                        <button className="button2 btn-action">
                            <a href={`tel:${activeServ.clientPhone}`}>
                                Call
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        }

        </>
    );
}
 
export default ActiveService;