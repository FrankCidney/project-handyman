const userReducer = (state, action) => {
    const storeUser = (userId, auth, id, username, phoneNo, defaultLocation) => {
        const user = userId? {
            userId: userId,
            authenticated: auth,
            id: id,
            username: username,
            phoneNo: phoneNo,
            defaultLocation: defaultLocation
        } : { 
            userId: '', 
            authenticated: false,
            id: '',
            username: '',
            phoneNo: '',
            defaultLocation: ''
        };
        localStorage.setItem('authStatus', JSON.stringify(user));
    }

    switch (action.type) {
        case 'ADD_USER':
            storeUser(
                action.payload.userId, 
                action.payload.authenticated,
                action.payload.id,
                action.payload.username,
                action.payload.phoneNo,
                action.payload.defaultLocation
            );
            return {
                ...state,
                userId: action.payload.userId,
                authenticated: action.payload.authenticated,
                id: action.payload.id,
                username: action.payload.username,
                phoneNo: action.payload.phoneNo,
                defaultLocation: action.payload.defaultLocation
            }
        case 'LOGOUT':
            localStorage.removeItem('authStatus');
        default:
            return state;
    }
}

export default userReducer;