import React from 'react';
import styles from './aboutUs.module.css';
import Images from 'config/Images';
import Data from './data.json';
import {Lazyloader} from 'components/commons';

const BodyContainer = props => {
    return (
        <div className={styles.bodyContainer}>
            <Lazyloader direction='down'>
                <div className={styles.whoAreWeContainer}>
                    <span className={styles.mainTitle}>{Data.title}</span>
                    <span className={styles.descriptionText}>{Data.description}</span>
                    <span className={styles.quoteText}>{Data.quote}</span>
                </div>
            </Lazyloader>
            <Lazyloader direction='up'>
                <div className={styles.whoAreWeContainer}>
                    <span className={styles.mainTitle}>Values</span>
                    <div>
                        {
                            Data.values.map((d, idx)=>(
                                <div className={styles.valueItemDiv} key={idx.toString()}>
                                    {/* <img src={Images[d.title.toLowerCase()]} className={styles.valueIcon}/> */}
                                    <div className={styles.valueItemInfoBox}>
                                        <span className={styles.valueTitle}>{d.title}</span>
                                        <span className={styles.valueDescription}>{d.description}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Lazyloader>
        </div>
    );
}

export {
    BodyContainer
}