import { combineReducers } from "redux"
import accountReducer from "./reducers/accountReducer"
import editModeReducer from "./reducers/editModeReducer"
import encryptionKeyReducer from "./reducers/encryptionKeyReducer"
import recordsReducer from "./reducers/recordsReducer"
import recordsVisibleReducer from "./reducers/recordsVisibleReducer"
import rememberMeReducer from "./reducers/rememberMeReducer"
import searchTextReducer from "./reducers/searchTextReducer"
import snackbarReducer from "./reducers/snackbarReducer"
import loginLoadingReducer from "./reducers/loginLoadingReducer"
import updateLoadingReducer from "./reducers/updateLoadingReducer"

const rootReducer = combineReducers({
    accountReducer,
    editModeReducer,
    encryptionKeyReducer,
    recordsReducer,
    recordsVisibleReducer,
    rememberMeReducer,
    searchTextReducer,
    snackbarReducer,
    loginLoadingReducer,
    updateLoadingReducer
})

export default rootReducer;