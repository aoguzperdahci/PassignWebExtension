import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import Signup from '../components/Signup';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 120
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 150
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 200
        },
    }
}));

const LoginPage = () => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Signup />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default LoginPage;
