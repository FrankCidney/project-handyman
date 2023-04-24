import Rating from '@mui/material/Rating';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useContext, useState } from 'react';
import './rate.scss';
import { handleFetch } from '../../../../../helpers';
import { useOutletContext } from 'react-router-dom';
import LockRating from '../../../../core/lock-rating/LockRating';
import { UserContext } from '../../../../../context/UserContext';

const Rate = () => {

    const { handymanId, ratingActive, deactivateRating } = useOutletContext();
    const [ratingVal, setRatingVal] = useState(0);
    const [review, setReview] = useState('');
    const { id } = useContext(UserContext);
    console.log(ratingVal);

    const handleClick = e => {
        handleFetch('user/rating', {
            method: 'PUT',
            body: {
                handymanId,
                ratingVal,
                review,
                id
            }
        })
            .then(data => deactivateRating())
            .catch(error => alert(error));
    }
    return ( 
        <LockRating ratingActive={ratingActive} >
            <div className='tab-content'>
                <p className="rating-title p-base">
                    How would you rate the service provided
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
                <p>Leave a review</p>
                <OutlinedInput
                    id="outlined-multiline-static"
                    fullWidth
                    placeholder='leave a review'
                    size='small'
                    multiline
                    rows={4}
                    className='lower-input'
                    name='jobTitle'
                    value={review}
                    onChange={e => setReview(e.target.value)}
                />
                <button className="button submit-rating"
                    onClick={handleClick}
                >
                    Submit
                </button>
                <p className='p-rating p2'>
                    Your rating will help the handyman connect with more clients
                </p>
            </div>
        </LockRating>
     );
}
 
export default Rate;