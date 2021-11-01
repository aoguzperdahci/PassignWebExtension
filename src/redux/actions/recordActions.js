import { loginSucces } from "./accountActions";
import * as actionTypes from "./actionTypes";
import { encryptRecords, decryptRecords, setEncryptionKey } from "./encryptionActions";
import { setRememberMe } from "./rememberMeActions";
import { setEditMode } from "./editModeActions";
import { setSnackbar } from "./snackbarActions";
import { setLoginLoading, setUpdateLoading } from "./loadingActions";

const url = "https://europe-west1-passigndev.cloudfunctions.net/passign";

export function setRecords(records) {
  return { type: actionTypes.SET_RECORDS, payload: records }
}

export function setRecordsVisible(records) {
  return { type: actionTypes.SET_RECORDS_VISIBLE, payload: records }
}

export function getRecords(id, authorization, key, rememberMe) {
  return function (dispatch) {
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        id: id,
        authorization: authorization
      }
    }).then(response => {
      if (response.ok) {
        var data = response.json();
        return data;
      } else {
        throw response.statusText;
      }
    }).then(data => {
      var records = decryptRecords(data, key);
      dispatch(setRecords(records));
      dispatch(setRecordsVisible(records));
      dispatch(loginSucces({
        state: true,
        id: id,
        authorization: authorization
      }));
      dispatch(setEncryptionKey(key));
      dispatch(setLoginLoading(false));
      if (rememberMe.state) {
        dispatch(setRememberMe(rememberMe));
      }
    }).catch(((error) => {
      dispatch(setSnackbar({show:true, message:"Login attempt failed. Please try again.", color:"#f00"}));
      dispatch(setLoginLoading(false));
      console.error(error);
  }));
  };
}

export function updateRecords(id, authorization, records, key) {
  return function (dispatch) {
    var raw = encryptRecords(records, key);
    var body = {records: raw};
    return fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        id: id,
        authorization: authorization
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
        var updated = decryptRecords(raw, key);
        dispatch(setRecords(updated));
        dispatch(setRecordsVisible(updated));
        dispatch(setEditMode(false));
        dispatch(setUpdateLoading(false));
        dispatch(setSnackbar({show:true, message:"Update successful", color:"#00c853"}));
      } else {
        throw response.statusText;
      }
    }).catch( (error) => {
      dispatch(setSnackbar({show:true, message:"Something went wrong. Please try again.", color:"#f00"}));
      dispatch(setUpdateLoading(false));
      console.error(error);
  });
  };
}