import * as actionTypes from "./actionTypes";

export function setRememberMe(state) {
  setLocalStorage(state);
  return { type: actionTypes.SET_REMEMBER_ME, payload: state }
}

function setLocalStorage(state) {
  localStorage.setItem("rememberMeState", state.state);
  localStorage.setItem("rememberMeUsername", state.username);
  localStorage.setItem("rememberMeToken", state.token);
}