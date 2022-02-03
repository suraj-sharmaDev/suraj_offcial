import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group';
import {Carousel} from 'react-bootstrap';
import {motion, useAnimation} from 'framer-motion';
import {useOnScreen, useWindowDimensions} from 'utils/CustomFn';
import styles from './commons.module.css';
import Images from 'config/Images';

export const Modal = (props) => {
	const closeOnEscapeKeyDown = (e) => {
		if ((e.charCode || e.keyCode) === 27) {
			props.onClose();
		}
	};

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKeyDown);
		return function cleanup() {
			document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
		};
	}, []);

	return ReactDOM.createPortal(
		<CSSTransition in={props.show} unmountOnExit timeout={{enter: 0, exit: 300}}>
			<div className={styles.modal} onClick={props.onClose}>
				<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
					<div className={styles.modalHeader}>
						<h4 className={styles.modalTitle}>{props.title}</h4>
					</div>
					<div className={styles.modalBody}>{props.children}</div>
					{/* <div className="modal-footer">
						<button onClick={props.onClose} className="button">
							Close
						</button>
					</div> */}
				</div>
			</div>
		</CSSTransition>,
		document.getElementById('root'),
	);
};

export const CarouselCommon = ({children}) => {
	return (
		<Carousel className={styles.carouselBody} controls={false}>
			{React.Children.map(children, (child, index) => {
				return <Carousel.Item>{React.cloneElement(child)}</Carousel.Item>;
			})}
		</Carousel>
	);
};

export const PageFooter = (props) => {
	return (
		<div className={styles.footerContainer}>
			<span className={styles.pageTitle}>Crypt4Bits</span>
			<span className={styles.copyrightInfo}>
				COPYRIGHT © 2022 Crypt4Bits Pvt Ltd - ALL RIGHTS RESERVED
			</span>
		</div>
	);
};

export const Lazyloader = ({children, ...props}) => {
	const controls = useAnimation();
	const rootRef = useRef();
	const onScreen = useOnScreen(rootRef);
	const {height, width} = useWindowDimensions();
	const {direction = 'left', duration = 1, transition = 'easeOut', key = 0, distance = 60} = props;

	let initialAnimated = {
		opacity: 0,
	};

	let finalAnimated = {
		opacity: 1,
	};

	switch (direction) {
		case 'up':
			initialAnimated.y = distance;
			finalAnimated.y = 0;
			break;
		case 'down':
			initialAnimated.y = -distance;
			finalAnimated.y = 0;
			break;
		case 'right':
			initialAnimated.x = distance;
			finalAnimated.x = 0;
			break;
		default:
			initialAnimated.x = -distance;
			finalAnimated.x = 0;
			break;
	}

	useEffect(() => {
		if (onScreen) {
			controls.start({
				...finalAnimated,
				transition: {
					duration: duration,
					ease: transition,
				},
			});
		}
	}, [onScreen, controls]);

	return (
		<motion.div key={key} ref={rootRef} initial={initialAnimated} animate={controls}>
			{children}
		</motion.div>
	);
};

export const FloatingLabelInput = (props) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState({
		status: false,
		message: ''
	});
	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const {type = 'text', label = 'Enter text', onComplete} = props;

	useEffect(()=>{
		if(props.value !== value) {
			setValue(props.value);
		}
	}, [props.value]);

	function handleChange(e) {
		const inputText = e.target.value;
		setValue(inputText);
		onComplete(inputText);
		if (type === 'email') {
			if (!inputText.match(mailformat)) {
				setError({
					status: true,
					message: 'Incorrect email!'
				});
			} else {
				setError({
					status: false,
					message: ''
				});
			}
		} else if(type === 'text'){
			if (inputText.length <= 3) {
				setError({
					status: true,
					message: 'Must have greater than 3 characters!'
				})
			} else {
				setError({
					status: false,
					message: ''
				});
			}
		}
	}

	return (
		<div className={styles.inputContainer}>
			<input type={type} value={value} onChange={handleChange} id="name" autoComplete='off' />
			<label className={value && styles.filled} htmlFor="name">
				{label}
			</label>
			{
				error.status && (
					<span className={styles.errorMessage}>{error.message}</span>
				)
			}
		</div>
	);
};

export const LoaderAnimated = props => {
	const {
		startAnimation = false
	} = props;
	const loadingContainerVariants = {
		start: {
			transition: {
				staggerChildren: 0.1
			}
		},
		end: {
			transition: {
				staggerChildren: 0.1
			}			
		}
	};

	const loadingCircleVariants = {
		start: {
			"y": "0%"
		},
		end: {
			"y": "100%"
		}
	};

	const loadingCircleTransition = {
		duration: 0.4,
		yoyo: Infinity,
		ease: "easeInOut"
	}

	if(!startAnimation) return null;
	return (
		<motion.div 
			className={styles.loaderContainer}
			variants={loadingContainerVariants}
			initial="start"
			animate="end"
		>
			<motion.span 
				className={styles.loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>
			<motion.span 
				className={styles.loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}			 
			/>
			<motion.span 
				className={styles.loadingCircle}
				variants={loadingCircleVariants}
				transition={loadingCircleTransition}
			/>			
		</motion.div>
	);
}

export const PopupNotification = props => {
	const {
		message = "This is the message",
		showNotification = true
	} = props;

	const [showNotif, updateShowNotif] = React.useState(false);
	
	const controls = useAnimation();
	let initialAnimated = {
		opacity: 0,
		y: -20
	};
	let finalAnimated = {
		opacity: 1,
		y: 0
	};

	useEffect(()=>{
		console.log('animation started');
		if(showNotification) {
			controls.start({
				...finalAnimated,
				transition: {
					duration: 0.8,
					ease: 'easeInOut',
				},
			});			
		} else {
			controls.start({
				...initialAnimated,
				transition: {
					duration: 0.3,
					ease: 'easeInOut',
				},
			});			
		}
	}, [controls, showNotification]);

	return (
		<motion.div 
			className={styles.popUpContainer}
			key={0} 
			initial={initialAnimated} 
			animate={controls}
		>
			<div className={styles.popUpInfoDiv}>
				<img src={Images.notificationBell} className={styles.notificationIcon} />
				<span>{message}</span>
			</div>
		</motion.div>
	);
}

export const MenuButton = ({
	isOpen = false,
	width = 24,
	height = 24,
	strokeWidth = 1,
	color = '#000',
	transition = null,
	lineProps = null,
	...props
}) => {
	const variant = isOpen ? 'opened' : 'closed';
	const top = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: 45,
			translateY: 2,
		},
	};
	const center = {
		closed: {
			opacity: 1,
		},
		opened: {
			opacity: 0,
		},
	};
	const bottom = {
		closed: {
			rotate: 0,
			translateY: 0,
		},
		opened: {
			rotate: -45,
			translateY: -2,
		},
	};
	lineProps = {
		stroke: color,
		strokeWidth: strokeWidth,
		vectorEffect: 'non-scaling-stroke',
		initial: 'closed',
		animate: variant,
		transition,
		...lineProps,
	};
	const unitHeight = 4;
	const unitWidth = (unitHeight * width) / height;

	return (
		<motion.svg
			viewBox={`0 0 ${unitWidth} ${unitHeight}`}
			overflow="visible"
			preserveAspectRatio="none"
			width={width}
			height={height}
			{...props}
		>
			<motion.line x1="0" x2={unitWidth} y1="0" y2="0" variants={top} {...lineProps} />
			<motion.line x1="0" x2={unitWidth} y1="2" y2="2" variants={center} {...lineProps} />
			<motion.line x1="0" x2={unitWidth} y1="4" y2="4" variants={bottom} {...lineProps} />
		</motion.svg>
	);
};

export const AnimatedPageContainer = ({children, className, activeLink, ...props}) => {
	const controls = useAnimation();
	let initialAnimated = {
		opacity: 0,
		x: 100
	};
	let finalAnimated = {
		opacity: 1,
		x: 0
	};
	
	useEffect(()=>{
		console.log('animated page : ', activeLink);
		controls.start({
			...finalAnimated,
			transition: {
				duration: 0.5,
				ease: 'easeInOut',
			},
		});
	}, [controls, activeLink]);

	return (
		<motion.div
			key={activeLink} 
			initial={initialAnimated} 
			animate={controls}
		 	className={className}
		>
			{children}
		</motion.div>
	);
}