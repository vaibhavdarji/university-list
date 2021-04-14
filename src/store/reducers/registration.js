import { registerTypes } from "../actionTypes";

const registration = (state = {}, action) => {
    if (action.type === registerTypes.REGISTER_REQUEST) {
        state.registering = true;
    } else if (action.type === registerTypes.REGISTER_SUCCESS) {
        state = {};
    } else if (action.type === registerTypes.REGISTER_FAILURE) {
        state = {};
    }
    return state;
};

export default registration;