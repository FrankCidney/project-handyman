const userReducer = (state, action) => {
    const storeUser = (userId, auth) => {
        const user = userId? {
            userId: userId,
            authenticated: auth
        } : { userId: '', authenticated: false };
        localStorage.setItem('authStatus', JSON.stringify(user));
    }

    switch (action.type) {
        case 'ADD_USER':
            storeUser(action.payload.userId, action.payload.authenticated);
            return {
                ...state,
                userId: action.payload.userId,
                authenticated: action.payload.authenticated
            }
        case 'LOGOUT':
            localStorage.removeItem('authStatus');
        default:
            return state;
    }
}

export default userReducer;