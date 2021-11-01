import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function recordsVisibleReducer(state = initialState.recordsVisible, action) {
    switch (action.type) {
        case actionTypes.SET_RECORDS_VISIBLE:
            var clonedArray = action.payload.map(r => {return {...r}})
            return clonedArray;
        default:
            return state;
    }
}