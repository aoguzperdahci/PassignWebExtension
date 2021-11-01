import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function updateLoadingReducer(state = initialState.loginLoading, action) {
    switch (action.type) {
        case actionTypes.SET_UPDATE_LOADING:
            return action.payload;
        default:
            return state;
    }
}