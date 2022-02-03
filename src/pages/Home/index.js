import React from 'react';
import {connect} from 'react-redux';
import {Banner, BodyContainer} from 'components/home';
import {PageFooter} from 'components/commons';
import styles from './home.module.css';

const Index = props => {
    return (
        <div className={styles.homeContainer}>
            <Banner />
            <BodyContainer />
            <PageFooter />
        </div>
    );
}

const mapStateToProps = state => ({
    product: state.product,
    order: state.order
});

export default connect(mapStateToProps, null)(Index);