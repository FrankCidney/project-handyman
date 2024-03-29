import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import './handymanList.scss';
import Rating from '@mui/material/Rating';
import { randomColor } from '../../../../helpers';

const HandymanList = ({ handymen, userCoords }) => {
    
    return ( 
        handymen.map(handyman => (
            <div key={handyman._id}>
                <Link to={`/profile/handyman-client-view/${handyman._id}?userLng=${userCoords[0]}&userLat=${userCoords[1]}`} className='list-content'>
                    <div className="avatar-div">
                        <Avatar className='avatar' 
                            sx={{backgroundColor: randomColor()}}
                        >
                            {handyman.username[0].toUpperCase()}
                        </Avatar>
                    </div>
                    <div className='name-div'>
                        <p className='p1'>{handyman.username}</p>
                        {/* <div> */}
                            <Rating 
                                name='half-rating'
                                value={handyman.rating.value}
                                precision={0.5}
                                className="stars"
                                size='small'
                                readOnly
                            />
                        {/* </div> */}
                        {/* <p className='p2'>rating: {handyman.rating.ratingValue}</p> */}
                    </div>
                    <p className='distance-p p2'>{Math.trunc(handyman.dist.calculated)}m</p>
                </Link>
            </div>
        ))
     );
}
 
export default HandymanList;

// handymen ? handymen.map(handyman => (
//     <div className='list-content' key={handyman._id}>
//         <div className="avatar-div">
//             <Avatar className='avatar' />
//         </div>
//         <div className='name-div'>
//             <p className='p1'>{handyman.username}</p>
//             <i className='p2'>rating</i>
//         </div>
//         <p className='distance-p p2'>{Math.trunc(handyman.dist.calculated)}m</p>
//     </div>
// )) : null