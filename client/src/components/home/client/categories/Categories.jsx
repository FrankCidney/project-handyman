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

const Categories = ({ toggleDrawer }) => {
    // context values
    const { userId, authenticated } = useContext(UserContext);
    console.log({ userId, authenticated });
    const categories = useContext(CategoriesContext);
    // const { setSocketValue } = useContext(SocketContext);

    // set state
    // const [socket, setSocket] = useState(null);
    // const categories = [
    //     {
    //         id: "1",
    //         img: "url",
    //         title: "Electricity",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "2",
    //         img: "url",
    //         title: "Plumbing",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "3",
    //         img: "url",
    //         title: "Painting",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "4",
    //         img: "url",
    //         title: "Tiling",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "5",
    //         img: "url",
    //         title: "Drywall installation",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "6",
    //         img: "url",
    //         title: "Gutter repair",
    //         description: "Includes blah blah blah"
    //     },
    //     {
    //         id: "7",
    //         img: "url",
    //         title: "Welding",
    //         description: "Includes blah blah blah"
    //     }
    // ]

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
                <Navbar toggleDrawer={toggleDrawer} />
                <h1 className="page-title">
                Categories
                </h1>
                <TextField placeholder="Search categories"
                    // startAdornment={}
                    variant="outlined"
                    className="input category-input"
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