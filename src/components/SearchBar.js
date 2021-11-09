import Paper from "@material-ui/core/Paper";
import React, { useEffect } from "react";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { setRecordsVisible } from "../redux/actions/recordActions";
import { setSearchText } from "../redux/actions/searchActions";

const useStyles = makeStyles(theme => ({
    searchBarContainer: {
        marginTop: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
    },
    searchInput: {
        marginLeft: 10,
        flex: 1
    },
}))

const SearchBar = ({ recordsVisible, setRecordsVisibleState, searchText, setSearchTextState }) => {
    const classes = useStyles();

    useEffect(() => {
        var textarea = document.getElementById("searchUrl");

        if (textarea.value) {
            var text = textarea.value;
            var records = recordsVisible.map(record => search(record, text));
            if (records.some(isVisible)) {
                setSearchTextState(text);
                setRecordsVisibleState(records);
            } else {
                setSearchTextState("");
                records = recordsVisible.map(record => search(record, ""));
                setRecordsVisibleState(records);
            }
            textarea.value = null;
        }

    }, [])

    const isVisible = record => {
        return record.visible;
    }

    const handleSearchTextChange = event => {
        var text = event.target.value;
        setSearchTextState(text);
        var records = recordsVisible.map(record => search(record, text));
        setRecordsVisibleState(records);
    }

    const search = (record, text) => {
        if (record.website.toLowerCase().includes(text.toLowerCase())) {
            record.visible = true;
        } else {
            record.visible = false;
        }
        return record;
    }

    const clearInput = () => {
        setSearchTextState("");
        var records = recordsVisible.map(record => search(record, ""));
        setRecordsVisibleState(records);
    }

    return (
        <Box>
            <Paper className={classes.searchBarContainer}>
                <InputBase
                    className={classes.searchInput}
                    placeholder="Search for a record by website"
                    onChange={handleSearchTextChange}
                    value={searchText}
                />
                <IconButton aria-label="search" onClick={clearInput}>
                    <span className="material-icons md-48"> {searchText === "" ? "search" : "clear"}</span>
                </IconButton>
            </Paper>
        </Box>
    )
}

const mapStateToProps = state => {
    return {
        recordsVisible: state.recordsVisibleReducer,
        searchText: state.searchTextReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setRecordsVisibleState: (records) => { dispatch(setRecordsVisible(records)) },
        setSearchTextState: (text) => { dispatch(setSearchText(text)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);