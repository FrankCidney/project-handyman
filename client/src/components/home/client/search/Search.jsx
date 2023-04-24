import './search.scss';
// import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';
import HandymanList from '../handyman-list/HandymanList';
import { useContext, useEffect, useState } from 'react';
import { getLocation, handleFetch } from '../../../../helpers';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../core/navbar/Navbar';
import { UserContext } from '../../../../context/UserContext';

const Search = () => {

    // let params = useParams();
    const navigate = useNavigate();
    
    // set state values
    const [searchMethod, setSearchMethod] = useState('Home Location');
    const [coordinates, setCoordinates] = useState(null)
    const [handymen, setHandymen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [defaultMsg, setDefaultMsg] = useState(true);
    const [defaultDisplay, setDefaultDisplay] = useState(null);
    const [noneFound, setNoneFound] = useState(null);
    const [distanceFilter, setDistanceFilter] = useState(null);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [filteredHandymen, setFilteredHandymen] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // fetch default location from context
    const { defaultLocation, id } = useContext(UserContext);
    console.log(sessionStorage.getItem('handymanRes')? JSON.parse(sessionStorage.getItem('handymanRes')): 'this')

    // fetch home location when component loads
    useEffect( () => {
        if (!defaultLocation) {
            setDefaultMsg(false);
            setDefaultDisplay('You have not set a home location')
        } else {
            setCoordinates(defaultLocation.coordinates);
        }
    }, []);
    console.log({ coords: coordinates })

    // to run when search method is changed
    useEffect(() => {
        if (searchMethod === "Current-location") {
            getLocation()
                .then(({ coords: { latitude, longitude }}) => setCoordinates([longitude, latitude]))
                .catch( error => console.log(error));
        }
        if (searchMethod === "Home-location") {
            setCoordinates(defaultLocation.coordinates);
        }
    }, [searchMethod])

    // fetch list of nearby handymen when coordinates are set
    // useEffect(() => {
    //     if (coordinates) {
    //         // console.log({ coordinates });
            
    //     }
    // }, [coordinates]);

    // on submit search query
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setDefaultMsg(false);
        // console.log(searchQuery)
        handleFetch(`search/${searchQuery}?lng=${coordinates[0]}&lat=${coordinates[1]}&nCid=${id}`, {
            method: 'GET'
        }).then(nearbyHandymen => {
            // console.log('it came back')
            // check whether any nearby handymen were found
            if (nearbyHandymen === "No nearby handymen") {
                setNoneFound(nearbyHandymen);
                setLoading(false);
                setHandymen(null);
            } else {
                setHandymen(nearbyHandymen);
                sessionStorage.setItem('handymanRes', JSON.stringify(nearbyHandymen));
                setLoading(false);
                setNoneFound(null);
            }
        }).catch((error) => alert(error));
    }
    
    // when the filters on the interface are applied
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
                    <form onSubmit={handleSubmit} className='search-form'>
                        <TextField placeholder="Search for service"
                            variant="outlined"
                            className="input alt-input in-alt"
                            size="small"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <button type='submit' className="button2 bt-cust">Search</button>
                    </form>

                    <div className="semi-top">
                        <h2 className='filters h2'>Filters</h2>
                        <form className='filters'>
                            <select 
                                name="distance" 
                                id="distance" 
                                className="select button distance font-small"
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
                                className="select button rating font-small"
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
                        <h2 className='main-title mt-small'>Handymen near you</h2>
                        <form className="search-by">
                            <label htmlFor='search-by h2'>Search by</label>
                            <select 
                                name="search-by" 
                                id="search-by" 
                                className="search-by select button font-small"
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
                    {loading && <div className="loading center">loading...</div> }
                    {(defaultMsg) && <div className="loading center">Find qualified handymen near you</div> }
                    {defaultDisplay && <div className="default-diplay center">Search for handymen</div> }
                    {noneFound && <div>No nearby handymen</div>}
                    {handymen && <HandymanList handymen={filteredHandymen? filteredHandymen : handymen} userCoords={coordinates} />}
                    {/* {handymen && <div>Show this</div>} */}
                </div>
            </div>
        </>
     );
}
 
export default Search;