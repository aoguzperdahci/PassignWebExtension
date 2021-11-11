import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles, IconButton, Tooltip, Typography } from '@material-ui/core';
import logoFind from "../images/logoFind";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  record: {
    width: "100%",
    height: 80,
    position: "relative"
  },
  text: {
    color: "white",
    fontSize: "1.1rem",
    textDecoration: "none",
    display: "inline-block",
    position: "absolute",
    top: -5,
    paddingLeft: 20
  },
  img: {
    width: 80,
    height: 80,
    display: "inline-block"
  },
  autofill: {
    color: "#ffffff",
    right: 10,
    top: 10,
    padding: 10,
    position: "absolute"
  }
}));

const FeedItem = ({ record }) => {
  const classes = useStyles();

  const autofill = () => {
    document.getElementById("username-autofill").value = record.username;
    document.getElementById("password-autofill").value = record.password;
    document.getElementById("submit-autofill").click();
  }

  return (
    <Paper className={classes.paper}>
      <Link to={"/records/" + record.id} style={{ textDecoration: "none" }}>

        <div className={classes.record}>
          <img src={logoFind(record.website.toLowerCase())} alt={record.website} className={classes.img} />
          <h2 className={classes.text}>{record.website}</h2>
          <h2 className={classes.text} style={{ opacity: 0.6, top: 30 }}>{record.username}</h2>

          <Tooltip className={classes.autofill} title={<Typography variant="subtitle2">Autofill</Typography>}>
            <IconButton onClick={() => autofill()} >
              <span style={{ fontSize: 34 }} className="material-icons md-48">password</span>
            </IconButton>
          </Tooltip>

        </div>

      </Link>

    </Paper>
  );
};

export default FeedItem;