import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function snackbarReducer(state = initialState.snackbar, action) {
    switch (action.type) {
        case actionTypes.SET_SNACKBAR:
            return action.payload;
        default:
            return state;
    }
}