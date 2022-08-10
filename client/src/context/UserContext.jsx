import { createContext, useReducer } from "react";
import UserReducer from './userReducer';
// import { handleFetch } from "../helpers";

export const UserContext = createContext();

const userAuthStatus = localStorage.getItem('authStatus')? 
JSON.parse(localStorage.getItem('authStatus')) : { userId: '', authenticated: false };

const initialState = userAuthStatus;

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const addUser = user => dispatch({ type: 'ADD_USER', payload: user });
    const logout = () => dispatch({type: 'LOGOUT'});

    const contextValues = {
        ...state,
        addUser,
        logout
    }

    return ( 
        <UserContext.Provider value={contextValues} >
            {
                children
            }
        </UserContext.Provider>
     );
}
 
export default UserContextProvider;