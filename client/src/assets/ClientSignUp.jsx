import './userSignUp.scss';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const UserSignUp = () => {
    return (
        <div className="sign-in-sign-up">
            <div className='form-div'>
                <form>
                    <h1>User Sign Up</h1>
                    <Input placeholder='Username' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <PersonIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                    />
                    <Input placeholder='Email' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <EmailIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                    />
                    <Input placeholder='Phone no.' 
                        startAdornment={
                        <InputAdornment position='start'>
                            <LocalPhoneIcon fontSize='small'/> 
                        </InputAdornment>}
                        className="input"
                    />
                    <Input placeholder='Password' 
                        startAdornment={
                            <InputAdornment position='start'>
                                <HttpsIcon fontSize='small' />
                            </InputAdornment>
                        }
                        className="input"
                    />
                    <button type='submit' className='button'>
                        Sign Up
                    </button>
                </form>
            </div>
            <div className='check-account-status-div'>
                <p className='font-small'>Already have an account?</p>
                <a>Sign In</a>
            </div>
        </div>
    );
}

export default UserSignUp;