import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Avatar, Box, TextField, Typography, Button, Container, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import CryptoJS from 'crypto-js';
import jsPDF from 'jspdf';
import data from "../images/pdfBackground";
import { createAccount } from "../redux/actions/accountActions";
import { setSnackbar } from '../redux/actions/snackbarActions';

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
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: 350
        },
        [theme.breakpoints.up('sm')]: {
            width: 400
        },
        [theme.breakpoints.up('md')]: {
            width: 500
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 3),
    },
    box: {
        position: "relative",
        marginTop: -15
    },
    button: {
        padding: 15,
        left: 10
    },
    link: {
        textDecoration: "none",
        color: theme.palette.primary.light
    },
    terms: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "#FFFFFF"
        },
    }
}));

const Signup = ({ create, account, setSnackbarAlert }) => {
    const classes = useStyles();
    const [shortKey, setShortKey] = useState();
    const [encryptionKey, setEncryptionKey] = useState();
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    useEffect(() => {
        if (account.id !== "") {
            createPdf();
        }
        setLoading(false);
    }, [account])

    const handleClose = () => {
        setRedirect(true);
    };

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

    const changeHandler = (event) => {
        setShortKey(event.target.value);
    }

    const generateAuthPhrase = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%&()[]{}*/-+?<|>=_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var shuffledChars = shuffle(chars);
        var phraseLength = 16;
        var phrase = "";

        for (var i = 0; i < phraseLength; i++) {
            var randomNumber = Math.floor(Math.random() * shuffledChars.length);
            phrase += shuffledChars.substring(randomNumber, randomNumber + 1);
        }
        return phrase;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (shortKey.length < 1) {
                throw shortKey;
            }
            var salt = CryptoJS.lib.WordArray.random(32);
            var saltString = CryptoJS.enc.Base64.stringify(salt);
            var generatedKey = CryptoJS.PBKDF2(shortKey, saltString, { keySize: 18, iterations: 4000 });
            var key = CryptoJS.enc.Base64.stringify(generatedKey);
            var authorization = generateAuthPhrase();
            var authorizationToken = CryptoJS.HmacSHA512(authorization, key);
            setEncryptionKey(saltString + authorization + shortKey);
            setLoading(true);
            create(authorizationToken.toString());

        } catch (error) {
            var alert = {
                show: true,
                message: "Account could not be created. Please try again.",
                color: "#f00"
            };
            setSnackbarAlert(alert);
            setLoading(false);
        }
    }

    const createPdf = () => {
        var imgData = data;
        var doc = new jsPDF({
            orientation: "landscape",
            format: [1920, 1080],
            unit: "px"
        })
        doc.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);

        doc.setFillColor(187, 187, 187);
        doc.roundedRect(605, 180, 1070, 50, 5, 5, "F");

        doc.setLineWidth(1)
        doc.setDrawColor(0)
        doc.setFillColor(255, 59, 71)
        doc.circle(620, 195, 7, "FD")

        doc.setFillColor(255, 193, 0)
        doc.circle(640, 195, 7, "FD")

        doc.setFillColor(0, 215, 66)
        doc.circle(660, 195, 7, "FD")

        doc.setFont("Courier");
        doc.setFontSize(30)
        doc.text(980, 200, "Terminal-- -bash --80x24")

        doc.setLineWidth(0);
        doc.setFillColor(21, 21, 21);
        doc.rect(605, 210, 1070, 545, "F");
        doc.roundedRect(605, 210, 1070, 550, 5, 5, "F");

        var index = Math.ceil(shortKey.length / 2) + 24;

        doc.setTextColor(255, 255, 255)
        doc.text(630, 270, "Passign:~ anonymous-user$ login -info")
        doc.text(630, 310, "Master Key: " + account.id + encryptionKey.slice(0, index))
        doc.text(630, 350, encryptionKey.slice(index))
        doc.text(630, 390, "Short Key: " + shortKey)
        doc.text(630, 430, "Website: passigndev.web.app")
        doc.link(750, 415, 250, 20, { url: "https://passigndev.web.app/login" });
        doc.text(630, 510, "Passign:~ anonymous-user$ contact -info")
        doc.text(630, 550, "Email: ahmetoguzperdahci@gmail.com")
        doc.text(630, 590, "Linkedin: www.linkedin.com/in/aoguzperdahci")
        doc.link(760, 575, 450, 20, { url: "https://www.linkedin.com/in/aoguzperdahci/" });
        doc.text(630, 630, "Github: www.github.com/aoguzperdahci")
        doc.link(735, 615, 380, 20, { url: "https://github.com/aoguzperdahci" });
        doc.text(630, 710, "Passign:~ anonymous-user$ |")

        doc.save("Passign.pdf")
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {redirect && <Redirect to="/login" />}

                <div className={classes.form}>
                    <Stepper activeStep={activeStep} orientation="vertical" style={{ paddingBottom: 10 }}>

                        <Step key={0}>
                            <StepLabel>Accept the terms and conditions</StepLabel>
                            <StepContent align="center">

                                <TextField
                                    multiline
                                    fullWidth
                                    maxRows={10}
                                    disabled
                                    className={classes.terms}
                                    value={"This app is a personal project hence we don't provide any customer support. If you would have a problem " 
                                        + "you can still contact us but please acknowledge that we may not be able to solve it. Also, if you have a "
                                        + "request or a complaint feel free to contact us. We keep your data safe with military-grade encryption. "
                                        + "The data can't be decrypted without the encryption key. The encryption key is derived from your master "
                                        + "key which only you have. The encryption key never leaves your machine. Therefore, no one, including us, "
                                        + "can access your data. If you lose your master key there's no way to recover your lost data. The app uses "
                                        + "local storage for easy login feature. It stores a piece of the master key in encrypted form. We advise you "
                                        + "to watch the tutorial on the main page to have a better understanding of how to use the app. You can look "
                                        + "github page for more technical explanation."}
                                ></TextField>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    style={{ marginTop: 20, padding:10 }}
                                >
                                    I’ve read and accept the terms &amp; conditions
                                </Button>

                            </StepContent>
                        </Step>

                        <Step key={1}>
                            <StepLabel>Set a short key</StepLabel>
                            <StepContent>

                                <form noValidate onSubmit={handleSubmit}>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="shortKey"
                                            label="Short key"
                                            type="text"
                                            id="shortKey"
                                            autoComplete="off"
                                            onChange={changeHandler}
                                        />
                                    </Box>

                                    <Box className={classes.box}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            disabled={loading}
                                        >
                                            Sign up
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                style={{
                                                    color: "#43a047",
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: -12,
                                                    marginLeft: -12,
                                                }}
                                            />
                                        )}
                                    </Box>

                                </form>

                            </StepContent>
                        </Step>
                    </Stepper>

                    <Container align="center">
                        <Box style={{marginTop:20}}> 
                            <Link to="/login" className={classes.link}>
                                Have an account? Log in
                            </Link>
                        </Box>
                    </Container>
                </div>

                <Dialog open={account.id !== ""} onClose={handleClose} className={classes.paper}>
                    <Box className={classes.form}>
                        <DialogTitle>Account Created</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="normal"
                                id="masterKey"
                                label="Master Key"
                                type="text"
                                fullWidth
                                variant="outlined"
                                disabled={true}
                                value={account.id + encryptionKey}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton onClick={() => copyToClipboard("masterKey")} className={classes.button}>
                                            <span style={{ fontSize: 30 }} className="material-icons md-48">content_copy</span>
                                        </IconButton>),
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Log in</Button>
                        </DialogActions>
                    </Box>
                </Dialog>

            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        account: state.accountReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        create: (authorizationToken) => { dispatch(createAccount(authorizationToken)) },
        setSnackbarAlert: (state) => { dispatch(setSnackbar(state)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

