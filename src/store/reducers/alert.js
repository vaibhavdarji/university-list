import { alertTypes } from "../actionTypes";

const alert = (state = {}, action) => {
    if (action.type === alertTypes.SUCCESS) {
        state.type = 'success';
        state.message = action.payload;
    } else if (action.type === alertTypes.ERROR) {
        state.type = 'error';
        state.message = action.payload;
    }
    return state;
};

export default alert;