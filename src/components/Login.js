import React from 'react';
import { Avatar, Button, TextField, FormControlLabel, Grid, Box, Typography, Container, Switch, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { connect } from "react-redux";
import { useState } from 'react';
import CryptoJS from 'crypto-js';
import { getRecords } from "../redux/actions/recordActions"
import { setRememberMe } from "../redux/actions/rememberMeActions"
import { setLoginLoading } from "../redux/actions/loadingActions"
import { setSnackbar } from '../redux/actions/snackbarActions';
import { setSessionState } from '../redux/actions/sessionStateActions';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            width: 350
          },
          [theme.breakpoints.up('sm')]: {
            width: 400
          },
    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
    box: {
        position: "relative",
    },
    button: {
        padding: 15,
        left: 10
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    }
}));

function Login({ login, rememberMeState, setRememberMeState, loading, setLoading, setSnackbarAlert, loginState, setSession }) {
    const classes = useStyles();
    const [masterKey, setMasterKey] = useState("");
    const [username, setUsername] = useState("");
    const [shortKey, setShortKey] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const changeHandler = (event) => {
        switch (event.target.name) {
            case "masterKey":
                setMasterKey(event.target.value);
                break;
            case "username":
                setUsername(event.target.value);
                break;
            case "rememberMe":
                setRememberMe(event.target.checked)
                break;
            case "shortKey":
                setShortKey(event.target.value);
                break;
            default:
                break;
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (masterKey.length < 101) {
                throw masterKey;
            }

            var finalKey = masterKey;
            //fix for copying multiple lines
            finalKey = finalKey.replace("\n", "");
            finalKey = finalKey.replace("\n", "");
            finalKey = finalKey.replace("\r", "");
            finalKey = finalKey.replace("\r", "");
            finalKey = finalKey.replace(" ", "");
            finalKey = finalKey.replace(" ", "");

            var id = finalKey.slice(0, 20);
            var salt = finalKey.slice(20, 84);
            var authPhrase = finalKey.slice(84, 100);
            var passPhrase = finalKey.slice(100);
            var generatedKey = CryptoJS.PBKDF2(passPhrase, salt, { keySize: 18, iterations: 4000 });
            var key = CryptoJS.enc.Base64.stringify(generatedKey);
            var authorization = CryptoJS.HmacSHA512(authPhrase, key).toString();
            var hash = CryptoJS.SHA256(passPhrase).toString();
            var token = CryptoJS.AES.encrypt(id + salt + authPhrase, hash).toString();
            var newRememberMe = {
                state: rememberMe,
                username: username,
                token: token
            }
            login(id, authorization, key, newRememberMe);
        } catch (error) {
            var alert = {
                show: true,
                message: "Login attempt failed. Please try again.",
                color: "#f00"
            };
            setSnackbarAlert(alert);
            setLoading(false);
        }
    }

    const handleLoginRememberMe = (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (shortKey.length < 4) {
                throw shortKey;
            }
            var token = rememberMeState.token;
            var hash = CryptoJS.SHA256(shortKey).toString();
            var decrypted = CryptoJS.AES.decrypt(token, hash).toString(CryptoJS.enc.Utf8);
            var id = decrypted.slice(0, 20);
            var salt = decrypted.slice(20, 84);
            var authPhrase = decrypted.slice(84);
            var generatedKey = CryptoJS.PBKDF2(shortKey, salt, { keySize: 18, iterations: 4000 });
            var key = CryptoJS.enc.Base64.stringify(generatedKey);
            var authorization = CryptoJS.HmacSHA512(authPhrase, key).toString();
            var newRememberMe = {
                state: true,
                username: rememberMeState.username,
                token: rememberMeState.token
            }
            login(id, authorization, key, newRememberMe);
        } catch (error) {
            setSnackbarAlert({
                show: true,
                message: "Login attempt failed. Please try again.",
                color: "#f00"
            });
            setLoading(false);
        }

    }

    const clearRememberMeState = (event) => {
        event.preventDefault();
        setRememberMeState({
            state: false,
            username: "",
            token: ""
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper} >
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in {rememberMeState.state ? "as " + rememberMeState.username : ""}
                </Typography>
                {rememberMeState.state ? (
                    <form className={classes.form} noValidate onSubmit={handleLoginRememberMe}>
                        <Box className={classes.box}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="shortKey"
                                label="Short Key"
                                type="password"
                                id="shortKey"
                                autoComplete="off"
                                value={shortKey}
                                onChange={changeHandler}
                            />
                        </Box>

                        <Box className={classes.box}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                className={classes.submit}
                            >
                                Log In
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        color: "#43a047",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -8,
                                        marginLeft: -15,
                                    }}
                                />
                            )}
                        </Box>

                        <Container align="center">
                            <Link to="/login" className={classes.link} onClick={clearRememberMeState}>
                                Log in as a different user
                            </Link>
                        </Container>
                    </form>
                ) : (
                    <form className={classes.form} noValidate onSubmit={handleLogin}>
                        <Box className={classes.box}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="masterKey"
                                label="Master Key"
                                type="password"
                                id="masterKey"
                                autoComplete="off"
                                onChange={changeHandler}
                                value={masterKey}
                            />

                        </Box>
                        <Grid container>

                            <Grid item xs>
                                <Box mt={3} mb={3}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="rememberMe"
                                                color="primary"
                                                onChange={changeHandler}
                                            />
                                        }
                                        label="Remember me"
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs>
                                <Box display="block" style={{ height: 50, width: "auto" }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        name="username"
                                        label="Username"
                                        type="text"
                                        id="username"
                                        autoComplete="off"
                                        onChange={changeHandler}
                                        disabled={!rememberMe}
                                        value={rememberMe ? username : ""}
                                    />
                                </Box>
                            </Grid>

                        </Grid>

                        <Box className={classes.box}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                            >
                                Log In
                            </Button>
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        color: "#43a047",
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: -8,
                                        marginLeft: -15,
                                    }}
                                />
                            )}
                        </Box>

                        <Container align="center">
                            <Link to="/signup" className={classes.link}>
                                Don't have an account? Sign Up
                            </Link>
                        </Container>
                    </form>)}
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        rememberMeState: state.rememberMeReducer,
        loading: state.loginLoadingReducer,
        loginState: state.accountReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: (id, authorization, key, rememberMe) => { dispatch(getRecords(id, authorization, key, rememberMe)) },
        setRememberMeState: (state) => { dispatch(setRememberMe(state)) },
        setLoading: (state) => { dispatch(setLoginLoading(state)) },
        setSnackbarAlert: (state) => { dispatch(setSnackbar(state)) },
        setSession: () => {dispatch(setSessionState())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);