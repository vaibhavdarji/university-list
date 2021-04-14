import { universityTypes } from "../actionTypes";
const initialState = {
    loading: false,
    data: [],
    error: null,
    next_page: true,
};

const universities = (state = initialState,  {type, payload} ) => {

    if (type === universityTypes.UNIVERISITIES_REQUEST) {
        state.loading = true;
    } else if (type === universityTypes.UNIVERISITIES_SUCCESS) {
        if (payload.page === 1) {
            state.data = payload.data;
        } else {
            state.data.push(...payload.data);
        }
        state.next_page = payload.next_page;
        state.loading = false;
    } else if (type === universityTypes.UNIVERISITIES_FAILURE) {
        state.error = payload;
        state.loading = false;
    }
    return state;
};

export default universities;