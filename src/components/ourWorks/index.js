import React from 'react';
import {motion, useAnimation} from 'framer-motion';
import styles from './ourWorks.module.css';
import Data from './data.json';
import Images from 'config/Images';
import {Lazyloader} from 'components/commons';

const WorkBodyContainer = (props) => {
	const [selectIndex, updateSelectIndex] = React.useState(null);

	const setSelectedIndex = (idx) => {
		// check if selected index is already in state
		if (selectIndex === idx) {
			updateSelectIndex(null);
		} else {
			updateSelectIndex(idx);
		}
		return;
	};

	return (
		<div className={styles.bodyContainer}>
			<div className={styles.ourWorksContainer}>
				<span className={styles.mainTitle}>Few of our works</span>
			</div>
			<>
				{Data.map((d, idx) => {
                    const isSelected = selectIndex === idx;
					return (
						<div key={idx.toString()} className={styles.workItemDiv}>
							<Lazyloader direction={idx % 2 == 0 ? 'right' : 'left'}>
								<img src={Images[d.image]} className={styles.workImage} />
							</Lazyloader>
							<span className={styles.workItemTitle}>{d.title}</span>
							<div className={styles.workItemInfoDiv}>
								<span className={isSelected ? styles.workItemDescpAnimated : styles.workItemDescp}>
									{!isSelected ? d.shortInfo : d.description}
								</span>
								{
									!isSelected && (
										<motion.button
											className={styles.learnBtn}
											whileHover={{
												scale: 1.1,
												boxShadow: '0px 0px 8px rgb(255,255,255)',
											}}
											onClick={() => setSelectedIndex(idx)}
										>
											Show More
										</motion.button>
									)
								}
							</div>
						</div>
					);
				})}
			</>
		</div>
	);
};

export {WorkBodyContainer};
