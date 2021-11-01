import * as actionTypes from "./actionTypes";

export function setLoginLoading(state) {
    return { type: actionTypes.SET_LOGIN_LOADING, payload: state }
}

export function setUpdateLoading(state) {
    return { type: actionTypes.SET_UPDATE_LOADING, payload: state }
}