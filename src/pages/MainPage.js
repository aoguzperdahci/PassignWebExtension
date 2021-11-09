import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import Header from '../components/Header';
import Footer from '../components/Footer';
import headingImg from "../images/laptop2.png";
import passwordImg from "../images/strongPassword.jpg";
import encryptionImg from "../images/encryption.png";

const useStyles = makeStyles((theme) => ({
    paper: {
        paddingBottom: theme.spacing(5)
    },
    backgroundColor: {
        backgroundColor: theme.palette.primary.main,
    },
    heading: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        marginBottom: theme.spacing(3),
        maxWidth: 1440,
        marginLeft: "auto",
        marginRight: "auto"
    },
    title: {
        fontFamily: "Segoe UI",

        [theme.breakpoints.up('sm')]: {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.8rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    subtitle: {
        fontFamily: "Segoe UI",
        [theme.breakpoints.up('sm')]: {
            fontSize: '1rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '0.8rem',
        },
    },
    text: {
        fontFamily: "Segoe UI",
        fontWeight: 350,
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2rem',
        },
    },
    img: {
        width: "100%",
        display: "inline-block"
    },
    videoContainer: {
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}


const MainPage = () => {
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    return (
        <div>
            <Header />
            <Paper className={classes.paper}>

                <Paper className={classes.backgroundColor}>
                    <Grid container className={classes.heading} justifyContent="center" alignItems="center" spacing={3}>

                        <Grid item xs={7} style={{ textAlign: "center" }}>
                            <Typography variant="h4" className={classes.title}>ANONYMOUS PASSWORD MANAGER FOR THOSE WHO CARE ABOUT THEIR PRIVACY</Typography>
                            <Typography variant="subtitle1" className={classes.subtitle} style={{ marginBlockStart: 50 }}>*Completely free </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <img src={headingImg
                        } alt="anoniymity" className={classes.img}></img>

                        </Grid>
                    </Grid>
                </Paper>

                <Container>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="How to use" />
                        <Tab label="Why should you use a password manager?" />
                    </Tabs>

                    <TabPanel value={tabIndex} index={0}>
                        <div className={classes.videoContainer}>
                            <iframe className={classes.video} src="https://www.youtube.com/embed/z6kB5HwcqK0" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </TabPanel>

                    <TabPanel value={tabIndex} index={1}>
                        <Grid container alignItems="center" spacing={3}>

                            <Grid item sm={5} md={6}>
                                <img src={passwordImg} alt="password" className={classes.img}></img>
                            </Grid>
                            <Grid item sm={7} md={6}>
                                <Typography variant="h6" className={classes.text}>Password managers make it easier to maintain secure, unique passwords.
                                    For instance, instead of using a simple, easy-to-remember password for all your accounts, you can use your password manager
                                    to store complex passwords (like Gn$3kj$g34s) that are unique to your every account. Not only will those passwords be much harder
                                    to guess, their uniqueness is an additional security measure. When you reuse passwords, every account that uses the same password becomes
                                    vulnerable if one account is compromised.</Typography>
                            </Grid>

                        </Grid>

                        <Grid container alignItems="center" spacing={3}>

                            <Grid item sm={7} md={6}>
                                <Typography variant="h6" className={classes.text}>Password managers protect the data they store through what's known as encryptionImg.
                                    This process scrambles data so that it's tougher for hackers, cybercrooks and others to access your personal information.</Typography>
                                <Typography variant="h6" className={classes.text}>A password-protected vault of passwords simplifies access to websites that require logins.
                                    Also, you can use web extension for autofill the login forms.</Typography>
                            </Grid>
                            <Grid item sm={5} md={6}>
                                <img src={encryptionImg} alt="encryptionImg" className={classes.img}></img>

                            </Grid>

                        </Grid>
                    </TabPanel>

                </Container>
            </Paper>

            <div style={{ marginBottom: 20 }}>
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;
