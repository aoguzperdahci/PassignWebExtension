import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Login from '../components/Login';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginBottom:20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 100
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
            <Login />
            <div className={classes.footer}>
                <Footer />
            </div>
        </>
    )
}

export default LoginPage;
