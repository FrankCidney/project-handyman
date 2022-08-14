import Category from "./category/Category";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Navbar from "../../../core/navbar/Navbar";
import './categories.scss';
import { useContext, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { CategoriesContext } from "../../../../context/CategoriesContext";

const Categories = () => {
    // context values
    const { userId, authenticated } = useContext(UserContext);
    const categories = useContext(CategoriesContext);

    // set state
    const [searchTerm, setSearchTerm] = useState("");

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
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="container">
                <Grid container spacing={2} >
                    {
                        categories.filter(category => {
                            if (searchTerm === "") {
                                return category
                            } else if (category?.label.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return category
                            }
                        }).map(category => (
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