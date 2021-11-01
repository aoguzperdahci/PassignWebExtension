import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function recordsReducer(state = initialState.records, action) {
    switch (action.type) {
        case actionTypes.SET_RECORDS:
            var clonedArray = action.payload.map(r => { return { ...r } })
            return clonedArray;
        default:
            return state;
    }
}