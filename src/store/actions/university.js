import { universityService } from "../services";
import { universityTypes } from "../actionTypes";
import { alertActions } from "./";

const getUniversities = (page, name = '') => {
    const request = () => ({
        type: universityTypes.UNIVERISITIES_REQUEST
    });

    const success = payload => ({
        type: universityTypes.UNIVERISITIES_SUCCESS,
        payload
    })

    const failure = payload => ({
        type: universityTypes.UNIVERISITIES_FAILURE,
        payload
    });

    return dispatch => {
        dispatch(request());
        universityService
            .getData({current_page: page, name: name})
            .then(result => {
                dispatch(success(result));
            })
            .catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            })
    }
};
export const universityActions = {
    getUniversities
};

