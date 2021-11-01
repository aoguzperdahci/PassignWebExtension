import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function loginLoadingReducer(state = initialState.loginLoading, action) {
    switch (action.type) {
        case actionTypes.SET_LOGIN_LOADING:
            return action.payload;
        default:
            return state;
    }
}