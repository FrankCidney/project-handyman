import { createContext, useReducer } from "react";
import NavReducer from './navReducer';

export const NavContext = createContext();

const initialState = { drawerVal: false, notifications: [] }

 const NavContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(NavReducer, initialState);

    const toggleFunc = val => dispatch({ type: 'TOGGLE_DRAWER', payload: val });
    const notificationFunc = val => dispatch({ type: 'NOTIFICATION', payload: val });
    const clearFunc = () => dispatch({ type: 'CLEAR_NOTIFICATIONS' });

    const contextValues = {
        ...state, 
        toggleFunc,
        notificationFunc,
        clearFunc
    }

    return (
        <NavContext.Provider value={contextValues} >
            {
                children
            }
        </NavContext.Provider>
    )
 }

 export default NavContextProvider;