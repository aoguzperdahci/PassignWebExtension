import React, { useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { setEditMode } from "../redux/actions/editModeActions";
import { setRecordsVisible, updateRecords } from "../redux/actions/recordActions";
import { setUpdateLoading } from "../redux/actions/loadingActions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "absoulute",
    top: 0
  },
  offset: {
    marginBottom: 60
  }
}));

const Header = ({ loginState, records, recordsVisible, encryptionKey, setEditState, editMode, setRecordsVisibleState, updateRecordsState, loading, setLoading }) => {
  const classes = useStyles();

  useEffect(() => {
    if (loginState.state) {
      var initialValue = {records: records, login: loginState, encryptionKey: encryptionKey}
      sessionStorage.setItem("initialValue", JSON.stringify(initialValue));
      document.getElementById("setInitialValue").click();
    }
  }, [loading, encryptionKey])

  const enterEditMode = () => {
    setEditState(true);
  }

  const discardChanges = () => {
    setEditState(false);
    setRecordsVisibleState(records);
  }

  const saveChanges = () => {
    setLoading(true);
    updateRecordsState(loginState.id, loginState.authorization, recordsVisible, encryptionKey);
  }

  const logOut = () => {
    document.getElementById("clearInitialValue").click();
    window.close();
  }

  const addNew = () => {
    var website = document.getElementById("urlHostname").value || "";
    recordsVisible[recordsVisible.length] = { id: recordsVisible.length, visible: true, website: website, username: "", password: "" };
    setRecordsVisibleState(recordsVisible);
  }

  const loggedoutState = () => (
    <Link to="/login" style={{ textDecoration: "none" }} className="wrapper">
      <IconButton className="icon cyan">
        <Typography variant="subtitle2" className="tooltip">
          Log in
        </Typography>
        <span className="material-icons md-48">person</span>
      </IconButton>
    </Link>
  )

  const loggedinState = () => (
    <>
      <Box style={{ textDecoration: "none" }} className="wrapper">
        <IconButton onClick={() => enterEditMode()} className="icon cyan" >
          <Typography variant="subtitle2" className="tooltip">
            Edit
          </Typography>
          <span className="material-icons md-48">edit</span>
        </IconButton>
      </Box>

      <Box style={{ textDecoration: "none" }} className="wrapper">
        <IconButton onClick={() => logOut()} className="icon red">
          <Typography variant="subtitle2" className="tooltip">
            Log out
          </Typography>
          <span className="material-icons md-48">logout</span>
        </IconButton>
      </Box>

    </>
  )

  const editState = () => (
    <>
      <Link to={"/records/" + recordsVisible.length} style={{ textDecoration: "none" }}>
        <Box className="wrapper">
          <IconButton onClick={() => addNew()} className="icon white" disabled={loading}>
            <Typography variant="subtitle2" className="tooltip">
              Add new
            </Typography>
            <span className="material-icons md-48">add</span>
          </IconButton>
        </Box>
      </Link>

      <Link to="/records" style={{ textDecoration: "none" }}>
        <Box style={{ textDecoration: "none" }} className="wrapper">
          <IconButton onClick={() => discardChanges()} className="icon red" disabled={loading}>
            <Typography variant="subtitle2" className="tooltip">
              Discard changes
            </Typography>
            <span className="material-icons md-48">close</span>
          </IconButton>
        </Box>
      </Link>

      <Link to="/records" style={{ textDecoration: "none" }}>
        <Box style={{ textDecoration: "none" }} className="wrapper">
          <IconButton onClick={() => saveChanges()} className="icon cyan" disabled={loading}>
            <Typography variant="subtitle2" className="tooltip">
              Save changes
            </Typography>
            <span className="material-icons md-48">done</span>
            {  loading && (<CircularProgress
            size={48}
            style={{
              color: "#ffffff",
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -24,
              marginLeft: -24,
            }} />)}
          </IconButton>
        </Box>
      </Link>

    </>
  )

  return (
    <>
      <AppBar className={classes.appBar}>
        <Container>
          <Toolbar>
            <Box style={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                >
                  Passign
                </Typography>
              </Link>
            </Box>

            {loginState.state ? (editMode ? editState() : loggedinState()) : loggedoutState()}

          </Toolbar>
        </Container>
      </AppBar>

      <Box className={classes.offset} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    editMode: state.editModeReducer,
    loginState: state.accountReducer,
    records: state.recordsReducer,
    recordsVisible: state.recordsVisibleReducer,
    encryptionKey: state.encryptionKeyReducer,
    loading: state.updateLoadingReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditState: (state) => { dispatch(setEditMode(state)) },
    setRecordsVisibleState: (records) => { dispatch(setRecordsVisible(records)) },
    updateRecordsState: (id, authorization, records, key) => { dispatch(updateRecords(id, authorization, records, key)) },
    setLoading: (state) => { dispatch(setUpdateLoading(state)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);