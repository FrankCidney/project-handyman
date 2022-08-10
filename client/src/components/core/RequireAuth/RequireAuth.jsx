import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const RequireAuth = ({ children }) => {

    const location = useLocation();
    const { authenticated } = useContext(UserContext);
    return authenticated === true? (
        children
    ) : (
    <Navigate to={'/'} replace /*state={{path: location.pathname}}*/ />
    );
}
 
export default RequireAuth;