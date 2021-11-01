import React from 'react';
import { Box, Hidden, Grid, makeStyles } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import RecordDetail from './RecordDetail';
import { connect } from "react-redux";
import SearchBar from './SearchBar';
import FeedItem from "./FeedItem";


const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    }
}));

const RecordList = ({ records }) => {

    const { id } = useParams();
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container style={{maxWidth: 1440, marginLeft: "auto", marginRight:"auto"}}>
                <Grid item xs>
                    <Box className={classes.box}>
                    <SearchBar/>
                        {records.map(r => (
                            r.visible && <FeedItem key={r.id} record={r} />
                        ))}
                    </Box>
                </Grid>
                <Hidden smDown>
                    <Grid item xs>
                        {id && (<RecordDetail />)}
                    </Grid>
                </Hidden>
            </Grid>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        records: state.recordsVisibleReducer,
    };
}

export default connect(mapStateToProps)(RecordList);
