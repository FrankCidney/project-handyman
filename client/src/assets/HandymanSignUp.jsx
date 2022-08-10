import './handymanSignUp.scss';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { useEffect, useState } from 'react';
import SetLocation from '../../../modals/set-location/SetLocation';
import { getLocation, handleFetch } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';

const HandymanSignUp = () => {
    // const [coordinates, setCoordinates] = useState({});
    let navigate = useNavigate();

    // state values
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        password: '',
        categories: [],
        defaultLocation: {}
    });
    console.log({userDetails});

    // categories to display in category input
    const categories = [
        { label: 'Plumber', id: 1},
        { label: 'Electrician', id: 2},
        { label: 'Painter', id: 3},
    ];
    // setCoordinates({ lat: latitude, lng: longitude }
    // setCoordinates({ error })

    // function to get location of user
    const handleLocationClick = (e) => {
        getLocation()
            .then(({ coords: { latitude, longitude }}) => setUserDetails({...userDetails, defaultLocation: { coordinates: [latitude, longitude] }}))
            .catch( error => setUserDetails({...userDetails, defaultLocation: { coordinates: error }}));
    }
    
    // fires when closing modal
    const handleClose = () => setOpen(false);

    // on form submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(true);
    }
    
    // fires when set location button on modal is clicked
    const setLocation = (e) => {
        if (userDetails.defaultLocation.coordinates) {
            console.log("handle fetch")
            // send post request with user details
            handleFetch('/signup/handyman', {
                body: userDetails
            }).then((data) => {
                if (data.user) {
                    navigate('/categories');
                }
            });
        } else {
            console.log("You have not entered a location");
        }
    }

    // fires when not now button on modal is clicked
    const notNow = (e) => {
        setUserDetails({...userDetails, defaultLocation: {type: "Point", coordinates: []}});
    }

    // to run when not now is clicked
    useEffect(() => {
        if (userDetails.defaultLocation.type) {
            // send post request with user details
            handleFetch('signup/handyman', {
                body: userDetails
            }).then((data) => {
                if (data.user) {
                    navigate('/categories');
                }
                // if (data.errors) {
                //     console.log(data);
                //     setErrors(data.errors)
                // }
            });
        }
    }, [userDetails.defaultLocation]);

    return ( 
        <div className="sign-in-sign-up">
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <h1>Handyman Sign Up</h1>
                    <Input placeholder='Username' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <PersonIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                        value={userDetails.username}
                        onChange={e => setUserDetails({...userDetails, username: e.target.value})}
                    />
                    <Input placeholder='Email' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <EmailIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                        value={userDetails.email}
                        onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                    />
                    <Input placeholder='Phone no.' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <LocalPhoneIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                        value={userDetails.phoneNo}
                        onChange={e => setUserDetails({...userDetails, phoneNo: e.target.value})}
                    />
                    <Input placeholder='Password' 
                        startAdornment={
                            <InputAdornment position='start'>
                                <HttpsIcon fontSize='small' />
                            </InputAdornment>
                        }
                        className="input"
                        value={userDetails.password}
                        onChange={e => setUserDetails({...userDetails, password: e.target.value})}
                    />
                    <Autocomplete
                        disablePortal
                        id='categories'
                        options={categories}
                        renderInput={(params) => (
                            <TextField {...params}
                                placeholder='Select one or more categories'
                                variant='standard'
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position='start'>
                                                <HomeRepairServiceIcon fontSize='small' />
                                            </InputAdornment>
                                            {params.InputProps.startAdornment}
                                        </>
                                    )
                                }}
                                className='input'
                            />
                        )}
                        multiple = {true}
                        getOptionLabel={option => option.label}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        limitTags={2}
                        forcePopupIcon={false}
                        autoHighlight={true}
                        autoComplete={true}
                        className='input'
                        value={userDetails.categories}
                        onChange={(e, category) => {
                            setUserDetails({...userDetails, categories: category})
                            console.log({target: e.target.value});
                            console.log({category});
                        }}
                    />
                    <button type='submit' className='button'
                        // onClick={handleOpen}    
                    >
                        Sign Up
                    </button>
                </form>
                {/* <p>{`your coordinates are ${userDetails.defaultLocation.coordinates}`}</p> */}
                {/* <p>{`errors are ${errors.username}`}</p> */}
            </div>
            <div className='check-account-status-div'>
                <p className='font-small'>Already have an account?</p>
                <a>Sign In</a>
            </div>
            <SetLocation 
                open={open} 
                onClose={handleClose} 
                handleLocationClick={handleLocationClick} 
                setLocation={setLocation} 
                notNow={notNow}
            />
        </div>
     );
}
 
export default HandymanSignUp;