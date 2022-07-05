import * as actionTypes from "./actionTypes";
import { setSnackbar } from "./snackbarActions";

const url = process.env.REACT_APP_API_KEY;

export function createAccountSuccess(id) {
  return { type: actionTypes.CREATE_ACCOUNT_SUCCESS, payload: id }
}

export function createAccountFailed(state) {
  return { type: actionTypes.CREATE_ACCOUNT_FAILED, payload: state }
}

export function createAccount(authorization) {
  return function (dispatch) {
    return fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: authorization
      }
    })
      .then(response => {
        if (response.ok) {
          var data = response.text();
          return data;
        } else {
          throw data;
        }
      }).then(data => dispatch(createAccountSuccess(data)))
      .catch(((error) => {
        dispatch(setSnackbar({ show: true, message: "Account could not be created. Please try again.", color: "#f00" }));
        dispatch(createAccountFailed({
          state: false,
          id: "",
          authorization: ""
        }))
        console.error(error);
      }));
  };
}

export function loginSucces(loginState) {
  return { type: actionTypes.LOGIN_SUCCES, payload: loginState }
}