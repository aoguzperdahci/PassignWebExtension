import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function recordsReducer(state = initialState.rememberMe, action) {
    switch (action.type) {
        case actionTypes.SET_REMEMBER_ME:
            return action.payload;
        default:
            return state;
    }
}