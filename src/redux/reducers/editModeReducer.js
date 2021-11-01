import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function recordsReducer(state = initialState.editMode, action) {
    switch (action.type) {
        case actionTypes.SET_EDIT_MODE:
            return action.payload;
        default:
            return state;
    }
}