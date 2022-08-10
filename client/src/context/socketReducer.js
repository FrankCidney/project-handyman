const socketReducer = (state, action) => {
    // const storeSocketValue = (socket) => {
    //     const socketValue = socket? {
    //         socket: socket
    //     } : { socket: null };
    //     sessionStorage.setItem('socketValue', socketValue);
    // }

    switch (action.type) {
        case 'SET_SOCKET':
            // storeSocketValue(action.payload.socket);
            return {
                ...state,
                socket: action.payload.socket
            }
        default:
            return state;
    }
}

export default socketReducer;