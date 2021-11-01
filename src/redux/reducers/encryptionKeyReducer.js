import * as actionTypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function encryptionKeyReducer(state = initialState.encryptionKey, action) {
    switch (action.type) {
        case actionTypes.SET_ENCRYPTION_KEY:
            return action.payload;
        default:
            return state;
    }
}