import React from 'react'
import {
    Typography,
    Snackbar,
    Paper
} from "@material-ui/core";
import { connect } from "react-redux";
import { setSnackbar } from "../redux/actions/snackbarActions";


const SnackbarAlert = ({ snackbarState, setSnackbarState }) => {

    const handleAlertClose = () => {
        setSnackbarState({
            show: false,
            message: "",
            color: ""
        });
    }

    return (
        <Snackbar open={snackbarState.show} autoHideDuration={5000} onClose={handleAlertClose} >
            <Paper style={{ width: "100%", backgroundColor: snackbarState.color, padding: "15px 30px" }}>
                {snackbarState.color === "#f00" ?
                    <span className="material-icons md-48" style={{ position: "absolute", fontSize: 26, left: 18, bottom: 13 }}>error_outline</span> :
                    <span className="material-icons md-48" style={{ position: "absolute", fontSize: 26, left: 18, bottom: 13 }}>task_alt</span>}
                <Typography variant="subtitle2" style={{ display: "inline-block", marginLeft: 20 }}>
                    {snackbarState.message}
                </Typography>
            </Paper>
        </Snackbar>
    )
}

const mapStateToProps = state => {
    return {
        snackbarState: state.snackbarReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setSnackbarState: (state) => { dispatch(setSnackbar(state)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarAlert);
