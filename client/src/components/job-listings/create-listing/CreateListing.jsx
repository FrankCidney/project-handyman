import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import Navbar from "../../core/navbar/Navbar";
import ListingView from "../listing-view/ListingView";
import './createListing.scss';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { handleFetch } from "../../../helpers";

const CreateListing = () => {

    const navigate = useNavigate();
    const { id } = useContext(UserContext);

    const [jobs, setJobs] = useState([]);
    const [noJobs, setNoJobs] = useState(false);

    const handleClick = () => navigate('/new-listing');

        // get client's listed jobs
        useEffect(() => {
            handleFetch(`jobs/client/job-listings/${id}`, {
                method: 'GET'
            })
            .then(res => {
                console.log(res);
                if (res === 'none') {
                    setNoJobs(true);
                } else {
                    setJobs(res);
                    setNoJobs(false);
                }
            })
            .catch(error => console.log(error))
        }, [])
    
    return ( 
        <>
        <div className="top-content">
            <Navbar />
            {/* <NavbarHandyman /> */}
            <h2 className="page-title p-title">
            Listed jobs
            </h2>
            <button className="create-new button"
                onClick={handleClick}
            >
                {/* <AddIcon /> */}
                Create new</button>
        </div>
        <div className="container">
            <Grid container spacing={1}>
            {
                    noJobs? 
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="no-requests">You haven't listed any jobs.</div>
                        </Grid>
                    : jobs?.map((job, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <ListingView job={job} />
                        </Grid>
                    ))
                }
            </Grid>
        </div>
        </>
     );
}
 
export default CreateListing;