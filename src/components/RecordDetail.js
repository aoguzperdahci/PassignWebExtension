import React from 'react';
import { Box, Button, IconButton, TextField, Typography, Tooltip, makeStyles } from "@material-ui/core";
import { useParams, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setRecordsVisible } from "../redux/actions/recordActions";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: 0,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        width: "100%",
        position: "sticky",
        top: 60,
        display: "flex"
    },
    form: {
        marginTop: theme.spacing(1),
    },
    container: {
        width: "100%",
        height: "100%",
    },
    textField: {
        width: "85%",
        display: "flex",
    },
    boxField: {
        marginLeft: 20,
        marginTop: theme.spacing(4),
        position: "relative"
    },
    button: {
        display: "inline-block",
        padding: 15,
        position: "absolute",
        bottom: -5,
        left: "85%"
    },
    delete: {
        color: "#ffffff",
        backgroundColor: "#f00",
        marginTop: 50,
        margin: "auto",
        "&:hover": {
            backgroundColor: "#c62828",
        },
    },
}));

const RecordDetail = ({ recordsVisible, editMode, setRecordsVisibleState }) => {

    const { id } = useParams();
    const classes = useStyles();

    const [showPassword, setShowPassword] = React.useState(false);

    const openInNewTab = website => {
        var url = website.includes("https://") ? website : "https://" + website;
        window.open(url, '_blank').focus();
    }

    async function copyToClipboard(text) {
        var copyText = document.getElementById(text);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        await navigator.clipboard.writeText(copyText.value);

        var test = await navigator.clipboard.readText();
        //for older browser versions
        if(test !== copyText.value){
            var input = document.createElement('textarea');
            document.body.appendChild(input);
            input.value = copyText.value;
            input.focus();
            input.select();
            document.execCommand('Copy');
            input.remove();
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickPasswordGenerate = () => {
        recordsVisible[id].password = generatePassword();
        setRecordsVisibleState(recordsVisible);
    };

    const generatePassword = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&*-+?<>ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shuffledChars = shuffle(chars);
        var passwordLength = Math.floor(Math.random() * 10) + 15;
        var password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * shuffledChars.length);
            password += shuffledChars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }

    const shuffle = (string) => {
        var a = string.split(""),
            n = a.length;

        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
        return a.join("");
    }

    const handleClickDelete = () => {
        recordsVisible[id] = {};
        setRecordsVisible(recordsVisible);
    }

    const changeHandler = (event) => {
        switch (event.target.name) {
            case "website":
                recordsVisible[id].website = event.target.value;
                setRecordsVisibleState(recordsVisible);
                break;
            case "username":
                recordsVisible[id].username = event.target.value;
                setRecordsVisibleState(recordsVisible);
                break;
            case "password":
                recordsVisible[id].password = event.target.value;
                setRecordsVisibleState(recordsVisible);
                break;
            default:
                break;
        }
    }

    return (
        <Box className={classes.main} component="main">
            <Box className={classes.container}>
                <form className={classes.form} noValidate>
                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Website
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="website"
                            type="text"
                            id="website"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={recordsVisible[id]?.website}
                            onChange={changeHandler}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Open</Typography>}>
                            <IconButton onClick={() => openInNewTab(recordsVisible[id]?.website)} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">open_in_new</span>
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Username
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="username"
                            type="text"
                            id="username"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={recordsVisible[id]?.username}
                            onChange={changeHandler}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Copy</Typography>}>
                            <IconButton onClick={() => copyToClipboard("username")} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">content_copy</span>
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box className={classes.boxField}>
                        <Typography
                            variant="h5"
                            color="textPrimary"
                        >
                            Password
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            name="password"
                            type={editMode || showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="off"
                            disabled={!editMode}
                            className={classes.textField}
                            value={recordsVisible[id]?.password}
                            onChange={changeHandler}
                            InputProps={{
                                endAdornment: editMode ? (
                                    <Tooltip title={<Typography variant="subtitle2">Generate new password</Typography>}>
                                        <IconButton onClick={() => handleClickPasswordGenerate()} style={{ left: 10, padding: 10 }}>
                                            <span style={{ fontSize: 30 }} className="material-icons md-48">autorenew</span>
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title={<Typography variant="subtitle2">{showPassword ? "Hide password" : "Show password"}</Typography>}>
                                        <IconButton onClick={() => handleClickShowPassword()} style={{ left: 10, padding: 10 }}>
                                            {showPassword ?
                                                (<span style={{ fontSize: 30 }} className="material-icons md-48">visibility</span>) :
                                                (<span style={{ fontSize: 30 }} className="material-icons md-48">visibility_off</span>)}
                                        </IconButton>
                                    </Tooltip>)
                            }}
                        />
                        <Tooltip title={<Typography variant="subtitle2">Copy</Typography>}>
                            <IconButton onClick={() => copyToClipboard("password")} className={classes.button}>
                                <span style={{ fontSize: 35 }} className="material-icons md-48">content_copy</span>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box style={{ margin: "auto", width: 200 }}>
                        {editMode &&
                            <Link to="/records" style={{ textDecoration: "none" }}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    className={classes.delete}
                                    onClick={handleClickDelete}
                                    startIcon={<span style={{ fontSize: 30 }} className="material-icons md-48">delete</span>}
                                >
                                    Delete
                                </Button>
                            </Link>}
                    </Box>
                </form>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        recordsVisible: state.recordsVisibleReducer,
        editMode: state.editModeReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setRecordsVisibleState: (records) => { dispatch(setRecordsVisible(records)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordDetail);