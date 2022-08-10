import './signUp.scss';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import { useEffect, useState, useContext } from 'react';
import SetLocation from '../../modals/set-location/SetLocation';
import { getLocation, handleFetch, validateInput } from '../../../helpers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { CategoriesContext } from '../../../context/CategoriesContext';

const SignUp = () => {
    // const [coordinates, setCoordinates] = useState({});
    let navigate = useNavigate();
    let location = useLocation();

    // context values
    const { addUser } = useContext(UserContext);
    const cats = useContext(CategoriesContext);

    // state values
    // const [invalidInput, setInavlidInput] = useState('');
    // const [errors, setErrors] = useState({ 
    //     username: '', email: '', phoneNo: '', password: '', categories: '' 
    // });
    const [errors, setErrors] = useState(null);
    const [open, setOpen] = useState(false);
    // const [user, setUser] = useState('');
    const [invalid, setInvalid] = useState({
        username: '', email: '', phoneNo: '', password: '', categories: '' 
    });
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phoneNo: '',
        password: '',
        ...((location.pathname === '/signup/handyman') && {categories: []}),
        defaultLocation: {}
    });
    console.log({userDetails});

    // input validation 
    // const regexPatterns = {
    //     username: /^\w+$/,
    //     phoneNo: /^\d{10}$/,
    //     password: /^[\w@-]{7,}$/
    // }
    // const validateInput = (regex, value) => {
    //     if (regex.test(value)) {
    //         setInvalid('');
    //     } else {
    //         setInvalid('invalid');
    //     }
    // }
    const handleInputChange = (e) => {
        // setEventTarget(e.target.attributes.name.value);
        setUserDetails({...userDetails, [e.target.attributes.name.value]: e.target.value});
        if (e.target.value.length === 0) {
            setErrors({...errors, [e.target.attributes.name.value]: `${e.target.attributes.name.value} required`});
            // setInavlidInput('invalid');
            setInvalid({...invalid, [e.target.attributes.name.value]: `invalid-${e.target.attributes.name.value}`});
        } else {
            validateInput(e.target.attributes.name.value, e.target.value, setInvalid, setErrors, errors, invalid);
        }
        console.log(errors)
        // console.log(invalid);
    }

    // categories to display in category input
    // const categories = [
    //     { label: 'Electricity', id: "1"},
    //     { label: 'Plumbing', id: "2"},
    //     { label: 'Painting', id: "3"},
    // ];
    // setCoordinates({ lat: latitude, lng: longitude }
    // setCoordinates({ error })

    // function to get location of user
    const handleLocationClick = (e) => {
        getLocation()
            .then(({ coords: { latitude, longitude }}) => setUserDetails({...userDetails, defaultLocation: { coordinates: [longitude, latitude] }}))
            .catch( error => console.log({ error }));
    }
    
    // fires when closing modal
    const handleClose = () => setOpen(false);

    // on form submit function
    const handleSubmit = (e) => {
        e.preventDefault();
        // Object.keys(userDetails).forEach(key => {
            
        //     if (userDetails[key] === '') {
        //         console.log(key);
        //         setErrors({...errors, [key]: `${key} required`});
        //         setInvalid({...invalid, [key]: `invalid-${key}`});
        //     }
        // });

        if (errors.username.length || errors.password.length || errors.email.length || errors.phoneNo.length) {
            // console.log(errors.username.length);
            alert('Invalid details');
        } else {
            setOpen(true);
        }
        
    }
    
    // fires when set location button on modal is clicked
    const setLocation = (e) => {
        if (userDetails.defaultLocation.coordinates) {
            console.log('here i am')
            if (userDetails.categories) {
                console.log("handle handyman fetch")
                // send post request with handyman user details
                handleFetch('user/signup/handyman', {
                    body: userDetails
                }).then((data) => {

                    if (data.user) {
                        addUser({ userId: data.user, authenticated: true });
                        // setUser(data.user);
                        navigate('/client-requests');
                    }

                    if (data.errors) {
                        setErrors(data.errors);
                        alert(data.errors.username, data.errors.email);
                    }

                }).catch(error => console.log(error.message));
            } else {
                console.log("handle client fetch")
                // send post request with client user details
                handleFetch('user/signup/client', {
                    body: userDetails
                }).then((data) => {

                    if (data.user) {
                        addUser({ userId: data.user, authenticated: true });
                        // setUser(data.user);
                        navigate('/categories');
                    }

                    if (data.errors) {
                        setErrors(data.errors);
                        alert(data.errors.username, data.errors.email);
                    }
                }).catch(error => console.log(error.message));
            }
        } else {
            console.log('here i am, at the error')
            alert("You have not entered a location");
        }
    }

    // fires when not now button on modal is clicked
    const notNow = (e) => {
        setUserDetails({...userDetails, defaultLocation: {type: "Point", coordinates: []}});
    }
    // -80.247, 25.391

    // to run when not now button on modal is clicked
    useEffect(() => {
        if (userDetails.defaultLocation.type) {
            if (userDetails.categories) {
                // send post request with handyman user details
                // handleFetch('user/signup/handyman', {
                //     body: userDetails
                // }).then((data) => {
                //     if (data.user) {
                //         addUser({ userId: data.user, authenticated: true });
                //         navigate('/client-requests');
                //     }
                //     if (data.errors) {
                //         console.log(data);
                //         setErrors(data.errors);
                //         console.log(errors);
                //     }
                // }).catch(error => console.log(error.message));
                alert('So that you appear in location searches, a handyman is required to set a default location');
            } else {
                // send post request with client user details
                handleFetch('user/signup/client', {
                    body: userDetails
                }).then((data) => {
                    if (data.user) {
                        addUser({ userId: data.user, authenticated: true });
                        navigate('/categories');
                    }
                    if (data.errors) {
                        console.log(data);
                        setErrors(data.errors);
                        alert(data.errors.username, data.errors.email);

                        // if (data.errors.username === 'that username already exists') {
                        //     setInvalid({ ...invalid, username: 'invalid-password' });
                        // }
                        // if (data.errors.email === 'that email already exists') {
                        //     setInvalid({ ...invalid, email: 'invalid-email' });
                        // }
                
                    }
                    console.log(errors);
                }).catch(error => console.log(error.message));
            }
        }
    }, [userDetails.defaultLocation]);

    return ( 
        <div className="sign-in-sign-up">
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    {location.pathname === '/signup/client' && <h1 className='sign-up-custom'>Client Sign Up</h1>}
                    {location.pathname === '/signup/handyman' && <h1 className='sign-up-custom'>Handyman Sign Up</h1>}

                    <Input placeholder='Username' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <PersonIcon fontSize='small'/> 
                        </InputAdornment>}
                        className={`input input-custom ${invalid.username}`}
                        name='username'
                        value={userDetails.username}
                        onChange={handleInputChange}
                    />
                    <p className="error-msg">{errors?.username}</p>
                    <Input placeholder='Email' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <EmailIcon fontSize='small'/> 
                        </InputAdornment>}
                        className={`input input-custom ${invalid.email}`}
                        name='email'
                        value={userDetails.email}
                        onChange={handleInputChange}
                    />
                    <p className="error-msg">{errors?.email}</p>
                    <Input placeholder='Phone no.' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <LocalPhoneIcon fontSize='small'/> 
                        </InputAdornment>}
                        className={`input input-custom ${invalid.phoneNo}`}
                        name='phoneNo'
                        value={userDetails.phoneNo}
                        onChange={handleInputChange}
                    />
                    <p className="error-msg">{errors?.phoneNo}</p>
                    <Input placeholder='Password' 
                        startAdornment={
                            <InputAdornment position='start'>
                                <HttpsIcon fontSize='small' />
                            </InputAdornment>
                        }
                        type='password'
                        className={`input input-custom ${invalid.password}`}
                        name='password'
                        value={userDetails.password}
                        onChange={handleInputChange}
                    />
                    <p className="error-msg">{errors?.password}</p>
                    {userDetails.categories && 
                        <Autocomplete
                            disablePortal
                            id='categories'
                            options={cats}
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
                    }
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
                {location.pathname === '/signup/client' && <Link to={'/signin/client'} className='sign'>Sign In</Link>}
                {location.pathname === '/signup/handyman' && <Link to={'/signin/handyman'} className='sign'>Sign In</Link>}
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
 
export default SignUp;