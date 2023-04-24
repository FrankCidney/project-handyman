// import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Navbar from '../../core/navbar/Navbar';
import './bid.scss';
import ListingCont from '../listing-view/ListingCont';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { handleFetch } from '../../../helpers';
import { UserContext } from '../../../context/UserContext';

const Bid = () => {
    let params = useParams();
    const navigate = useNavigate();
    const { userId } = useContext(UserContext);

    const [job, setJob] = useState({});
    const [bidPrice, setBidPrice] = useState('');
    const [bidDesc, setBidDesc] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ userId, bidPrice, bidDesc, jobId: params.jobId })
        handleFetch('jobs/bid', {
            body: { userId, bidPrice, bidDesc, jobId: params.jobId }
        }).then(data => navigate('/job-listings'))
        .catch(error => console.log(error));
    }

    // get job details on page load
    useEffect(() => {
        handleFetch(`jobs/bid/${params.jobId}`, {
            method: 'GET'
        })
        .then(job => setJob(job))
        .catch(error => console.log(error));
    }, [job]);
    
    return ( 
        <>
        <div className="top-content">
            <Navbar />
           
            <h2 className="page-title">
            Place bid
            </h2>
        </div>
        <div className="listing bid">
  
            <div className='listing-content'>
                <ListingCont job={job} />

                <div className="about-client font-small">
                    <p>Posted by:</p>
                    <ul className='c-deets'>
                        <li>John Doe</li>
                        <li>89m away</li>
                    </ul>
                </div>

                <hr />

                <p className="p-base bid-p">Offer to work on this job:</p>
                <form className="bid" onSubmit={handleSubmit}>

                    <p>Bid price</p>
                    <OutlinedInput
                        id="outlined-multiline-static"
                        fullWidth
                        placeholder='Price to offer'
                        size='small'
                        className='lower-input'
                        name='bidPrice'
                        value={bidPrice}
                        onChange={e => setBidPrice(e.target.value)}
                    />

                    <p>Bid desc.</p>
                    <OutlinedInput
                        id="outlined-multiline-static"
                        // label="Short bid description"
                        placeholder='Tell the client a bit about yourself'
                        fullWidth
                        multiline
                        rows={4}
                        size='small'
                        className='upper-input'
                        name='bidDescription'
                        value={bidDesc}
                        onChange={e => setBidDesc(e.target.value)}
                        // defaultValue="Default Value"
                    />

                    <button type='submit' className='button'>
                        Place bid
                    </button>
                </form>
            </div>

        </div>
        </>
     );
}
 
export default Bid;