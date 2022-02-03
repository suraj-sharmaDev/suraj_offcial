/******************************************
 *  Author : Suraj Sharma
 *  Created On : Tue Dec 28 2021
 *  File : index.js
 *******************************************/
 import React from 'react';
 import {connect} from 'react-redux';
 import {PageFooter} from 'components/commons';
 import {WorkBodyContainer} from 'components/ourWorks';

 import styles from './ourWorks.module.css';
 
 const Index = props => {
     return (
         <div className=''>
             <WorkBodyContainer />
             <PageFooter />
         </div>
     );
 }
 
 const mapStateToProps = state => ({
     product: state.product,
     order: state.order
 });
 
 export default connect(mapStateToProps, null)(Index);