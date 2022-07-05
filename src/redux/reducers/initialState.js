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

const getDefault = () => {
    var result = {
        records: [],
        recordsVisible: [],
        login: {
            state: false,
            id: "",
            authorization: "",
        },
        encryptionKey: "",
        rememberMe: getRememberMe(),
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

    return result;
}

var initialState = getDefault();

export default initialState;