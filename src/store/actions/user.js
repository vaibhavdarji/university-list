import { userService } from "../services";
import { authenticationTypes, registerTypes } from "../actionTypes";
import { alertActions } from "./";

const login = (username, password, callback) => {
    
    const request = payload => ({
        type: authenticationTypes.LOGIN_REQUEST,
        payload
    });

    const success = payload => ({
        type: authenticationTypes.LOGIN_SUCCESS,
        payload
    });

    const failure = payload => ({
        type: authenticationTypes.LOGIN_FAILURE,
        payload
    });
    

    return dispatch => {
        dispatch(request({ username }));
        userService
            .login(username, password)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success('Login successful'));
                callback();
            })
            .catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }
};

const logout = () => {
    userService.logout();
    return {
        type: authenticationTypes.LOGOUT
    };
};

const register = (user, callback) => {

    const request = payload => ({
        type: registerTypes.REGISTER_REQUEST,
        payload
    });

    const success = payload => ({
        type: registerTypes.REGISTER_SUCCESS,
        payload
    });

    const failure = payload => ({
        type: registerTypes.REGISTER_FAILURE,
        payload
    });

    return dispatch => {
        dispatch(request(user));
        userService
            .register(user)
            .then(() => {
                dispatch(success());
                dispatch(alertActions.success('Registration successful'));
                callback();
            })
            .catch(error => {
                console.log('\n\n catch error in register', error);
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    };
};
export const userActions = {
    login,
    logout,
    register
}