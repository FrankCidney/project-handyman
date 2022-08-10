import Navbar from "../../core/navbar/Navbar";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import '../profiles.scss';
import './clientProfile.scss';
import Layout from "../../core/layout/Layout";

const ClientProfile = () => {

    const [value, setValue] = useState(0);

    console.log(value);
    const handleChange = (e, value) => {
        setValue(value);
    }

    return (  
        <Layout>
            <Navbar />
            <div className="main-content">
                <Avatar className="avatar" />
                <h4 className="p1">Name goes here</h4>
                <h5 className="p2">Location goes here</h5>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                variant={"fullWidth"}
            >
                <Tab label="Details" component={Link} to="details" value={0} className='p-base' />
                <Tab label="Notifications" component={Link} to="notifications" value={1} className='p-base' />
            </Tabs>
            <Outlet />
        </Layout>
    );
}
 
export default ClientProfile;