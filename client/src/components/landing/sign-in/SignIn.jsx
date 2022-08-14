import './signIn.scss';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import Input from '@mui/material/Input';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { handleFetch } from '../../../helpers';
import { UserContext } from '../../../context/UserContext';

const SignIn = () => {
    // context values
    const { addUser } = useContext(UserContext);
    // set state
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState(null);
    const [invalid, setInvalid] = useState({ email: '', password: '' });

    let navigate = useNavigate();
    let location = useLocation();

    console.log(location.pathname)
    const handleSubmit = e => {
        e.preventDefault();
        if ( location.pathname === '/signin/handyman' ) {
            console.log(location.pathname)
            // send post request with user details
            handleFetch('user/signin/handyman', {
                body: userDetails
            }).then((data) => {
                if (data.user) {
                    console.log('authenticated');
                    addUser({ userId: data.user, authenticated: true });
                    navigate('/client-requests');
                }
                if (data.errors) {
                    console.log(data);
                    setErrors(data.errors);
                    if (data.errors.email === 'Unregistered email') {
                        setInvalid({ email: 'invalid-email', password: ''});
                    }
                    if (data.errors.password === 'Incorrect password') {
                        setInvalid({ email: '', password: 'invalid-password' });
                    }
                }
            }).catch(error => console.log(error));
        }
        if ( location.pathname === '/signin/client' ) {
            // send post request with user details
            handleFetch('user/signin/client', {
                body: userDetails
            }).then((data) => {
                if (data.user) {
                    addUser({ userId: data.user, authenticated: true });
                    navigate('/categories');
                }
                if (data.errors) {
                    console.log(data.errors);
                    // alert(data.errors.email, data.errors.password);
                    setErrors(data.errors);
                    if (data.errors.email === 'Unregistered email') {
                        setInvalid({ email: 'invalid-email', password: ''});
                    }
                    if (data.errors.password === 'Incorrect password') {
                        setInvalid({ email: '', password: 'invalid-password' });
                    }
                }
            }).catch(error => console.log(error));
        }
    }
    return ( 
        <div className="sign-in-sign-up">
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    {location.pathname === '/signin/client' && <h1>Sign In <br /> 
                    <span className='p-custom'>Sign in as client </span>
                    </h1>}
                    {location.pathname === '/signin/handyman' && <h1>Sign In <br /> 
                    <span className='p-custom'>Sign in as handyman </span>
                    </h1>}

                    <Input placeholder='Email' 
                        startAdornment={
                        <InputAdornment position="start">
                            <EmailIcon fontSize='small'/> 
                        </InputAdornment>}
                        className={`input input-custom ${invalid.email}`}
                        value={userDetails.email}
                        onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                    />

                    {/* <OutlinedInput 
                        placeholder='Email'
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon fontSize='small'/> 
                            </InputAdornment>}
                        className={`input input-custom ${invalid.email}`}
                        value={userDetails.email}
                        onChange={e => setUserDetails({...userDetails, email: e.target.value})}
                    /> */}
                    <p className="error-msg">{errors?.email}</p>
                    
                    <Input placeholder='Password' 
                        startAdornment={
                            <InputAdornment position='start'>
                                <HttpsIcon fontSize='small' />
                            </InputAdornment>
                        }
                        type='password'
                        className="input"
                        value={userDetails.password}
                        onChange={e => setUserDetails({...userDetails, password: e.target.value})}
                    />
                    <p className="error-msg">{errors?.password}</p>
                    <button type='submit' className='button'>
                        Sign In
                    </button>
                </form>
            </div>
            <div className='check-account-status-div'>
                <p className='font-small'>Don't have an account?</p>
                {location.pathname === '/signin/client' && <Link to={'/signup/client'} className='sign'>Sign Up</Link>}
                {location.pathname === '/signin/handyman' && <Link to={'/signup/handyman'} className='sign'>Sign Up</Link>}
                
            </div>
        </div>
     );
}
 
export default SignIn;