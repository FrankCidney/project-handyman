import { createContext, useState } from "react";
import categoriesData from "./categoriesData";

export const CategoriesContext = createContext();

const CategoriesContextProvider = ({ children }) => {
    const [cats] = useState(categoriesData);
    return ( 
        <CategoriesContext.Provider value={cats} >
            {
                children
            }
        </CategoriesContext.Provider>
     );
}
 
export default CategoriesContextProvider;