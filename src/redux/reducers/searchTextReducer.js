import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function searchTextReducer (state = initialState.searchText, action) {
    switch (action.type) {
        case actionTypes.SET_SEARCH_TEXT:
            return action.payload;
        default:
            return state;
    }
}