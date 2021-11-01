import React from 'react';
import { Hidden } from '@material-ui/core';
import Header from '../components/Header';
import RecordList from '../components/RecordList';
import RecordDetail from '../components/RecordDetail';
import DetailHeader from '../components/DetailHeader';

const RecordsDetailPage = () => {

    return (
        <>
            <Hidden smDown>
                <Header />
                <RecordList />
            </Hidden>
            <Hidden mdUp>
                <DetailHeader />
                <RecordDetail />
            </Hidden>
        </>
    )
}

export default RecordsDetailPage;
