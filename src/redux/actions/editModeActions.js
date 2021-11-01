import * as actionTypes from "./actionTypes";

export function setEditMode(state) {
    return {type: actionTypes.SET_EDIT_MODE, payload: state}
  }