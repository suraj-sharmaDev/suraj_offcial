import React from 'react';
 import {connect} from 'react-redux';
 import {PageFooter} from 'components/commons';
 import {BodyContainer} from 'components/aboutUs';

 import styles from './aboutUs.module.css';
 
 const Index = props => {
     return (
         <div className=''>
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