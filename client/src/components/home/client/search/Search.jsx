import './search.scss';
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from '@mui/material/TextField';
// import Layout from '../../../core/layout/Layout';
import HandymanList from '../handyman-list/HandymanList';
import { useEffect, useState } from 'react';
import { getLocation, handleFetch } from '../../../../helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../core/navbar/Navbar';

const Search = () => {

    let params = useParams();
    const navigate = useNavigate();
    
    // set state values
    const [searchMethod, setSearchMethod] = useState('Home Location');
    const [coordinates, setCoordinates] = useState(null)
    const [handymen, setHandymen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [defaultDisplay, setDefaultDisplay] = useState(null);
    const [noneFound, setNoneFound] = useState(null);
    const [distanceFilter, setDistanceFilter] = useState(null);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [filteredHandymen, setFilteredHandymen] = useState(null);

    // fetch home location when component loads
    useEffect( () => {
        handleFetch('user/defaultlocation', {
            method: 'GET'
        }, navigate).then(res => {
            console.log(res);
            if (res.location?.noHomeLocation) {
                setLoading(false);
                setDefaultDisplay(res.noHomeLocation)
            } 
            if (res.lng) { 
                console.log({ res });
                // store default location coordinates in session storage
                sessionStorage.setItem('defaultCoords', JSON.stringify(res));
                // set coordinates to default location fetched from db
                setCoordinates(res); 
            }
        })
    }, []);
    console.log({ coords: coordinates })

    // to run when search method is changed
    useEffect(() => {
        if (searchMethod === "Current-location") {
            getLocation()
                .then(({ coords: { latitude, longitude }}) => setCoordinates({ lng: longitude, lat: latitude }))
                .catch( error => console.log(error));
        }
        if (searchMethod === "Home-location") {
            const storedCoords = JSON.parse(sessionStorage.getItem('defaultCoords'));
            setCoordinates(storedCoords);
        }
    }, [searchMethod])

    // fetch list of nearby handymen when coordinates are set
    useEffect(() => {
        if (coordinates) {
            // console.log({ coordinates });
            handleFetch(`search/${params.categoryId}?lng=${coordinates.lng}&lat=${coordinates.lat}`, {
                method: 'GET'
            }).then(nearbyHandymen => {
                // check whether any nearby handymen were found
                if (nearbyHandymen === "No nearby handymen") {
                    setNoneFound(nearbyHandymen);
                    setLoading(false);
                    setHandymen(null);
                } else {
                    setHandymen(nearbyHandymen);
                    setLoading(false);
                    setNoneFound(null);
                }
            }).catch((error) => alert(error));
        }
    }, [coordinates]);
    
    // filter list of handymen by distance
    useEffect(() => {
        const filteredByDist = filteredHandymen? 
        filteredHandymen.filter(handyman => handyman.dist.calculated <= distanceFilter) :
        handymen?.filter(handyman => handyman.dist.calculated <= distanceFilter);

        setFilteredHandymen(filteredByDist);
    }, [distanceFilter]);

    // filter list of handymen by rating
    useEffect(() => {
        if (ratingFilter == 0) {
            setFilteredHandymen(null);
        } else {
            const filteredByRating = filteredHandymen?
            filteredHandymen.filter(handyman => handyman.rating.ratingValue > ratingFilter) :
            handymen?.filter(handyman => handyman.rating.ratingValue > ratingFilter);
    
            setFilteredHandymen(filteredByRating);
        }
    }, [ratingFilter]);

    return ( 
        <>
            <div className="wrapper-search">
                <div className="top-content">
                    <Navbar />
                    {/* <Autocomplete
                        disablePortal
                        id='search-bar'
                        options={array of handymen}
                        renderInput={(params) => (
                            <TextField {...params}
                                placeholder='Search by ...'
                                variant="outlined"
                                // className='search-input'
                                // sx={{ borderRadius: '50px' }}
                            />
                        )}
                        getOptionLabel={option => option.name}
                        autoHighlight={true}
                        size='small'
                        className='input search-input'
                    /> */}
                    <div className="semi-top">
                        <h2 className='filters h2'>Filters</h2>
                        <form className='filters'>
                            <select 
                                name="distance" 
                                id="distance" 
                                className="select button distance p3"
                                value={"Distance"}
                                onChange={e => setDistanceFilter(e.target.value)}
                            >
                                <option disabled hidden>Distance</option>
                                <option value="250">250m radius</option>
                                <option value="500">500m radius</option>
                                <option value="1000">1km radius</option>
                            </select>
                            <select 
                                name="rating" 
                                id="rating" 
                                className="select button rating p3"
                                value={"Rating"}
                                onChange={e => setRatingFilter(e.target.value)}
                            >
                                <option disabled hidden>Rating</option>
                                <option value="0">All</option>
                                <option value="4">Above 4.0</option>
                                <option value="3">Above 3.0</option>
                                <option value="1.5">Above 1.5</option>
                            </select>
                        </form>
                        <h1 className='main-title mt-small'>Handymen near you</h1>
                        <form className="search-by">
                            <label htmlFor='search-by h2'>Search by</label>
                            <select 
                                name="search-by" 
                                id="search-by" 
                                className="search-by select button p3"
                                value={searchMethod}
                                onChange={(e) => setSearchMethod(e.target.value)}
                            >
                                <option default disabled hidden>Search by</option>
                                <option value="Home-location">Home location</option>
                                <option value="Current-location">Current location</option>
                                {/* <option value="Name">Name</option> */}
                            </select>
                        </form>
                        
                    </div>
                    <h1 className='main-title mt-large'>Handymen near you</h1>
                </div>
                <div className="container container-search">
                    {loading && <div className="loading">Loading...</div> }
                    {defaultDisplay && <div className="default-diplay">Search for handymen</div> }
                    {noneFound && <div>No nearby handymen</div>}
                    {handymen && <HandymanList handymen={filteredHandymen? filteredHandymen : handymen} userCoords={coordinates} />}
                </div>
            </div>
        </>
     );
}
 
export default Search;