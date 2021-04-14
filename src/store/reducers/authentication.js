import { authenticationTypes } from "../actionTypes";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    ...(user ? {
        loggedIn: true,
        user
    }: {})
};

const authentication = (state = initialState, action) => {
    if (action.type === authenticationTypes.LOGIN_REQUEST) {
        state.loggingIn = true;
        state.user = action.payload;
    } else if (action.type === authenticationTypes.LOGIN_SUCCESS) {
        state.loggedIn = true;
        state.user = action.payload;
    } else if (action.type === authenticationTypes.LOGIN_FAILURE ||
        action.type === authenticationTypes.LOGOUT) {
        state = {};
    }
    return state;
};

export default authentication;