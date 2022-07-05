import * as actionTypes from "./actionTypes";
import { setRecords, setRecordsVisible } from "./recordActions";
import { loginSucces } from "./accountActions"
import { setEncryptionKey } from "./encryptionActions"

export function setSessionState(state) {
    return function (dispatch) {
        var initialValue = JSON.parse(sessionStorage.getItem("initialValue"));
        if (initialValue) {
            dispatch(setRecords(initialValue.records))
            dispatch(setRecordsVisible(initialValue.records))
            dispatch(setEncryptionKey(initialValue.encryptionKey))
            dispatch(loginSucces(initialValue.login))
        }

    }
  }