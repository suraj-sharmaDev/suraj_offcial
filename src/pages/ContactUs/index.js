import React from 'react';
import {connect} from 'react-redux';
import {BodyContainer} from 'components/contactUs';
import {PageFooter} from 'components/commons';
import styles from './contact.module.css';

const Index = props => {
    return (
        <div className={styles.homeContainer}>
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