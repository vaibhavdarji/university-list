import { alertTypes } from "../actionTypes";

const success = payload => ({
    type: alertTypes.SUCCESS,
    payload
});

const error = payload => ({
    type: alertTypes.ERROR,
    payload
});

const clear = () => ({
    type: alertTypes.CLEAR,
});

export const alertActions = {
    success,
    error,
    clear
};