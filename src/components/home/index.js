import React from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import Images from 'config/Images';
import {Lazyloader} from 'components/commons';
import styles from './home.module.css';
import Data from './data.json';

const Banner = (props) => {
	const {banner} = Data;
	const navigate = useNavigate();
	const controls = useAnimation();
	const [divPosition, setDivPosition] = React.useState({
		x: 0,
		y: 0,
	});

	React.useEffect(() => {
		const elem = document.getElementById('bannerDescription');
		const elemWidth = elem.clientWidth;
		const elemHeight = elem.clientHeight;

		elem.addEventListener('mousemove', onMousemove, false);

		function onMousemove(event) {
			const x = event.offsetX;
			const y = event.offsetY;
			/**
			 * We can calculate following positions
			 * bottom-right
			 * bottom-left
			 * top-right
			 * top-left
			 */
			const isRight = x > elemWidth / 2;
			const isBottom = y > elemHeight / 2;
			const yPos = isBottom ? 30 : -30;
			const xPos = isRight ? 30 : -30;
			const position = {
				x: xPos,
				y: yPos,
			};
			if (divPosition !== position) {
				setDivPosition(position);
			}
		}

		return () => {
			elem.removeEventListener('mousemove', onMousemove, false);
		};
	}, [divPosition]);

	React.useEffect(() => {
		controls.start({
			...divPosition,
			transition: {
				duration: 1,
				ease: 'easeOut',
			},
		});
	}, [divPosition, controls]);

	return (
		<div className={styles.bannerContainer}>
			{/* <img src={banner.backgroundImage} className={styles.bannerImage} /> */}
			<div className={styles.bannerImage}>
				<div className={styles.bannerDescription} id="bannerDescription">
					<motion.div className={styles.animatedInfoDiv} animate={controls}>
						<span className={styles.bannerTitle}>{banner.title}</span>
						<span className={styles.bannerSubtitle}>{banner.subtitle}</span>
						<button className={styles.bannerButton} onClick={()=>navigate('/contactUs', { replace: true })}>
							<span>Contact Us</span>
						</button>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

const BodyContainer = (props) => {
	const {body} = Data;
	return (
		<div className={styles.bodyContainer}>
			<span className={styles.bodyTitle}>What we do!</span>
			<div style={{marginTop: 30}}>
				{body.map((d, idx) => (
					<Lazyloader direction={idx % 2 == 0 ? 'left' : 'right'} key={idx.toString()}>
						<div className={styles.infoContainer}>
							<span className={styles.infoTitle}>{d.title}</span>
							<span className={styles.infoSubtitle}>{d.subtitle}</span>
						</div>
					</Lazyloader>
				))}
			</div>

			<div className={styles.connectContainer}>
				<span className={styles.bodyTitle}>Connect with us</span>
				<Lazyloader direction="up">
					<div className={styles.iconContainer}>
						<img src={Images.facebook} className={styles.socialAccountsIcon} />
						<img src={Images.twitter} className={styles.socialAccountsIcon} />
						<img src={Images.instagram} className={styles.socialAccountsIcon} />
						<img src={Images.linkedin} className={styles.socialAccountsIcon} />
					</div>
				</Lazyloader>
			</div>
		</div>
	);
};

export {Banner, BodyContainer};
