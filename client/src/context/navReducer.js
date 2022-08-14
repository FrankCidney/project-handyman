const navReducer = (state, action) => { 

        switch (action.type) {
            case 'TOGGLE_DRAWER':
                return {
                    ...state,
                    drawerVal: action.payload
                }
            case 'NOTIFICATION': 
                return {
                    ...state,
                    notifications: [...state.notifications, action.payload]
                }
            case 'CLEAR_NOTIFICATIONS':
                return {
                    ...state,
                    notifications: []
                }
            default: 
                return state;
        }
}
 
export default navReducer;