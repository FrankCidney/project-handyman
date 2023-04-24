import Grid from "@mui/material/Grid";
import Navbar from "../../core/navbar/Navbar";
import ListingView from "../listing-view/ListingView";
import { useEffect, useState } from "react";
import { handleFetch } from "../../../helpers";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [noJobs, setNoJobs] = useState(false);
    
    // get recommended jobs
    useEffect(() => {
        handleFetch('jobs/handyman/job-listings', {
            method: 'GET'
        })
        .then(res => {
            // console.log(res);
            if (res === 'none') {
                console.log('here none')
                setNoJobs(true)
            } else {
                console.log('here some')
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
   
            <h2 className="page-title">
            Job listings
            </h2>
        </div>
        <div className="container">
            <Grid container spacing={1}>
                {
                    noJobs? 
                        <Grid item xs={12} sm={6} md={4}>
                            <div className="no-requests">No job listings? Check back later!</div>
                        </Grid>
                    : jobs.map((job, index) => (
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
 
export default Jobs;