import OutlinedInput from '@mui/material/OutlinedInput';
import Autocomplete from '@mui/material/Autocomplete';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Navbar from '../../core/navbar/Navbar';
import { CategoriesContext } from '../../../context/CategoriesContext';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { handleFetch } from '../../../helpers';
import { useNavigate } from 'react-router-dom';
import './newListing.scss';

const NewListing = () => {

    let navigate = useNavigate();

    const cats = useContext(CategoriesContext);
    const { userId, authenticated, id, username, phoneNo, defaultLocation } = useContext(UserContext);

    // initialize job details
    const [jobDetails, setJobDetails] = useState({
        id: '',
        clientDetails: {
            id: id,
            username: username,
            phoneNo: phoneNo,
            defaultLocation: { coordinates: defaultLocation.coordinates }
        },
        jobTitle: '',
        jobDescription: '',
        bidCount: '',
        budget: '',
        avgBidPrice: '',
        skills: []
    })

    // set job details
    const handleInputChange = e => {
        setJobDetails({...jobDetails, [e.target.attributes.name.value]: e.target.value});
    }

    console.log({ jobDetails: jobDetails });

    // when form is submitted
    const handleSubmit = e => {
        e.preventDefault();
        handleFetch('jobs/new-listing', {
            body: jobDetails
        }).then(data => {
            if (data.code = "0") {
                console.log('yes yes')
                navigate('/create-listing');
            }
        }).catch(error => console.log(error));
    }

    return ( 
        <>
        <div>
            <div className="top-content">
                <Navbar />
            
                <h2 className="page-title">
                    Post job listing
                </h2>
            </div>
            <form className="bid container" onSubmit={handleSubmit}>

                <p>Job title</p>
                <OutlinedInput
                    id="outlined-multiline-static"
                    fullWidth
                    placeholder='Title'
                    size='small'
                    className='lower-input'
                    name='jobTitle'
                    value={jobDetails.jobTitle}
                    onChange={handleInputChange}
                />

                <p>Job desc.</p>
                <OutlinedInput
                    id="outlined-multiline-static"
                    // label="Short bid description"
                    placeholder='Describe the job you want to list'
                    fullWidth
                    multiline
                    rows={4}
                    size='small'
                    className='upper-input'
                    name='jobDescription'
                    // defaultValue="Default Value"
                    value={jobDetails.jobDescription}
                    onChange={handleInputChange}
                />

                <Autocomplete
                    disablePortal
                    id='skills'
                    options={cats}
                    renderInput={(params) => (
                        <TextField {...params}
                            placeholder='Select one or more skills'
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
                    getOptionLabel={option => option}
                    isOptionEqualToValue={(option, value) => option === value}
                    limitTags={2}
                    forcePopupIcon={false}
                    autoHighlight={true}
                    autoComplete={true}
                    className='input'
                    value={jobDetails.skills}
                    onChange={(e, skill) => {
                        setJobDetails({...jobDetails, skills: skill})
                        // console.log({target: e.target.value});
                        // console.log({skill});
                    }}
                />

                <p>Budget</p>
                <OutlinedInput
                    id="outlined-multiline-static"
                    fullWidth
                    placeholder='What is your budget for the job'
                    size='small'
                    className='lower-input'
                    name='budget'
                    value={jobDetails.budget}
                    onChange={handleInputChange}
                />
                <button type='submit' className='button listing-btn'>
                    Create listing
                </button>
            </form>
        </div>
        </>
     );
}
 
export default NewListing;