const getRememberMe = () => {
    var state = localStorage.getItem("rememberMeState");
    state = (state === "true");
    var usename = "";
    var token = "";
    if (state) {
        usename = localStorage.getItem("rememberMeUsername");
        token = localStorage.getItem("rememberMeToken");
    } else {
        state = false;
    }
    return {state: state, username: usename, token: token};
}

const getInitialSate = () => {
    var result = {};
    var initialValue = JSON.parse(sessionStorage.getItem("initialValue"));
    if (initialValue) {
        result ={
            records: initialValue.records,
            recordsVisible: initialValue.records,
            login: initialValue.login,
            rememberMe: getRememberMe(),
            encryptionKey: initialValue.encryptionKey,
            editMode: false,
            searchText: "",
            snackbar:{
                show: false,
                message:"",
                color:""
            },
            loginLoading: false,
            updateLoading: false
        };
    } else {
        result = {
            records: [],
            recordsVisible: [],
            login: {
                state: false,
                id: "",
                authorization: "",
            },
            rememberMe: getRememberMe(),
            encryptionKey: "",
            editMode: false,
            searchText: "",
            snackbar:{
                show: false,
                message:"",
                color:""
            },
            loginLoading: false,
            updateLoading: false
        };
    }

    return result;
}

var initialState = getInitialSate();

export default initialState;

