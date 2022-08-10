import { createContext, useReducer } from "react";
import socketReducer from "./socketReducer";

export const SocketContext = createContext();

// const socketValueStatus = sessionStorage.getItem('socketValue')? 
// sessionStorage.getItem('socketValue') : { socket: null };

const initialState = { socket: null };

const SocketContextProvider = ({ children }) => {
    

    const [state, dispatch] = useReducer(socketReducer, initialState);

    const setSocketValue = socket => dispatch({type: 'SET_SOCKET', payload: socket});

    const contextValues = {
        ...state,
        setSocketValue
    }

    return ( 
        <SocketContext.Provider value={contextValues} >
            {
                children
            }
        </SocketContext.Provider>
     );
}
 
export default SocketContextProvider;