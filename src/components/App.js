import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, blue } from "@material-ui/core/colors";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from "react-redux";
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import SnackbarAlert from './SnackbarAlert';
import RecordsDetailPage from '../pages/RecordsDetailPage';
import RecordsPage from '../pages/RecordsPage';

const theme = createTheme(({
  typography: {
    h1: {
      fontSize: "3rem"
    }
  },
  palette: {
    type: "dark",//#303030
    primary: {
      main: green[600]
    },
    secondary: {
      main: blue[600]
    }
  }
}));

function App({ loginState }) {
  return (
    <BrowserRouter>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {loginState.state ? <Redirect to="/records" /> : <Redirect to="/login" />}

          <Switch>

            <Route path="/" exact>
              {loginState.state ? <Redirect to="/records" /> : <MainPage />}
            </Route>

            <Route path="/login" exact>
            {loginState.state ? <Redirect to="/records" /> : <LoginPage />}
            </Route>

            <Route path="/signup" exact>
            {loginState.state ? <Redirect to="/records" /> : <SignupPage />}
            </Route>

            <Route exact path="/records">
            {loginState.state ?  <RecordsPage /> : <Redirect to="/login" />}
            </Route>

            <Route path="/records/:id">
            {loginState.state ?  <RecordsDetailPage /> : <Redirect to="/login" />}
            </Route>
            
          </Switch>

          <SnackbarAlert/>

        </ThemeProvider>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    loginState: state.accountReducer,
  };
}

export default connect(mapStateToProps)(App);

