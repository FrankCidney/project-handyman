import './listingView.scss';
import Navbar from "../../core/navbar/Navbar";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ListingCont from './ListingCont';

const ListingView = ({ job }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
        <div className="listing">

            {
                (location.pathname === '/job-listings') && (
                <Link to={`/bid/${job._id}`} className='listing-content'>
                    <ListingCont job={job} />
                </Link>)
            }

            {
                (location.pathname === '/create-listing') && (
                <div className='listing-content'>
                    <ListingCont job={job} />
                    <button 
                    className="button v-bids"
                        onClick={() => navigate(`/view-bids/${job._id}`)}
                    >
                        View bids
                    </button>
                </div>)
            } 
        </div>
        </>
     );
}
 
export default ListingView;