import Category from "./category/Category";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Navbar from "../../../core/navbar/Navbar";
import './categories.scss';
// import Layout from "../../../core/layout/Layout";
import { useContext } from "react";
import { UserContext } from "../../../../context/UserContext";
import { CategoriesContext } from "../../../../context/CategoriesContext";
// import { io } from "socket.io-client";
// import { SocketContext } from "../../../../context/SocketContext";

const Categories = () => {
    // context values
    const { userId, authenticated } = useContext(UserContext);
    // console.log({ userId, authenticated });
    const categories = useContext(CategoriesContext);
    // const { setSocketValue } = useContext(SocketContext);

    // set state
    // const [socket, setSocket] = useState(null);

    // socket connection 
    // useEffect(() => {
    //     setSocket(io('http://localhost:8080'));
    // }, [])
    // send new user event
    // useEffect(() => {
    //     // set socket context value
    //     setSocketValue({ socket });
    //     socket?.emit('newUser', userId);
    // }, [socket])
    
    return (  
        <>
            <div className="top-content">
                <Navbar />
                <h1 className="page-title">
                Categories
                </h1>
                <TextField placeholder="Search categories"
                    // startAdornment={}
                    variant="outlined"
                    className="input alt-input"
                    size="small"
                />
            </div>
            <div className="container">
                <Grid container spacing={2} >
                    {
                        categories.map(category => (
                            <Grid item key={category.id} xs={12} sm={6} md={4}>
                                <Category category={category} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </>
    );
}
 
export default Categories;