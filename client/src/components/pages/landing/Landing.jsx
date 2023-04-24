import Hero from "../../landing/hero/Hero";
import Grid from '@mui/material/Grid';
// import Typography from "@mui/material/Typography";
import { Outlet, useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import './landing.scss';

const Landing = () => {

    let location = useLocation();
    let myClass = "";
    const setClasses = {
        grid: "grid-small",
        displayNone: "display-none"
    };
    // console.log({ location });

    if ( location.pathname === "/signin/handyman" )
    {
        myClass = setClasses;
    } 
    if ( location.pathname === "/signin/client" )
    {
        myClass = setClasses;
    } 
    if ( location.pathname === '/signup/client' )
    {
        myClass = setClasses;
    }
    if ( location.pathname === '/signup/handyman' )
    {
        myClass = setClasses;
    }
    
    

    return ( 
        <Container className="cont-background">
            <div className="containing">
                {/* <div className="logo-div">
                    <h2 className="logo landing-logo">
                        Hire Me
                    </h2>
                </div> */}
                <Grid 
                    container
                    alignItems="center"
                    // justifyContent="center"
                    className={`grid ${myClass.grid}`}
                >
                    <Grid item xs={12} md={8}
                    >
                        <Hero myClass={myClass} />
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <Outlet />
                    </Grid>
                </Grid>
            </div>
        </Container>
     );
}
 
export default Landing;