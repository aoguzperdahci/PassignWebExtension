import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
}));

const DetailHeader = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/records" style={{ color: "white", fontSize: 48, textDecoration: "none" }}>
                        <IconButton className={classes.menuButton}>
                            <span class="material-icons md-48">arrow_back</span>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default DetailHeader;