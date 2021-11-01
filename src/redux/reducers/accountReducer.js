import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function accountReducer(state = initialState.login, action) {
    switch (action.type) {
        case actionTypes.CREATE_ACCOUNT_SUCCESS:
            var newState = { ...state, id: action.payload }
            return newState;
        case actionTypes.LOGIN_SUCCES:
            return action.payload;
        case actionTypes.CREATE_ACCOUNT_FAILED:
            return action.payload;
        default:
            return state;
    }
}