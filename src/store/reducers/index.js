import { combineReducers } from 'redux-immer';
import authentication from "./authentication";
import registration from "./registration";
import universities from "./university";
import alert from "./alert";
import produce from 'immer';


const rootReducer = combineReducers(produce, {
    authentication,
    registration,
    alert,
    universities,
});

export default rootReducer;