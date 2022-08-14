import Rating from '@mui/material/Rating';
import { useState } from 'react';
import './rate.scss';
import { handleFetch } from '../../../../../helpers';
import { useOutletContext } from 'react-router-dom';
import LockRating from '../../../../core/lock-rating/LockRating';

const Rate = () => {

    const { handymanId, ratingActive, deactivateRating } = useOutletContext();
    const [ratingVal, setRatingVal] = useState(0);
    console.log(ratingVal);

    const handleClick = e => {
        handleFetch('user/rating', {
            method: 'PUT',
            body: {
                handymanId,
                ratingVal
            }
        })
            .then(data => deactivateRating())
            .catch(error => alert(error));
    }
    return ( 
        <LockRating ratingActive={ratingActive} >
            <div className='tab-content'>
                <p className="rating-title p-base">
                    How would you rate the service provided by handyman name
                </p>
                <div>
                    <Rating 
                        name='half-rating'
                        value={ratingVal}
                        precision={1}
                        onChange={(e, newRatingVal) => setRatingVal(newRatingVal)}
                        className="stars"
                        size='large'
                    />
                </div>
                <button className="button submit-rating"
                    onClick={handleClick}
                >
                    Submit
                </button>
                <p className='p-rating p2'>
                    Your rating will help handyman name connect with more clients
                </p>
            </div>
        </LockRating>
     );
}
 
export default Rate;