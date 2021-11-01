import * as actionTypes from "./actionTypes";

export function setSnackbar(state) {
    return { type: actionTypes.SET_SNACKBAR, payload: state }
}