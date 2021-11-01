import * as actionTypes from "./actionTypes";

export function setSearchText(text) {
    return { type: actionTypes.SET_SEARCH_TEXT, payload: text }
}