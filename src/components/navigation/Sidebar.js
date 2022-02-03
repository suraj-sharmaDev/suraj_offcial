import React from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import styles from './navigation.module.css';
import Images from 'config/Images';
import {useWindowDimensions} from 'utils/CustomFn';
import {MenuButton, AnimatedPageContainer} from 'components/commons';

const SideBar = (props) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const {height, width} = useWindowDimensions();
	const [state, setState] = React.useState({
		showBox: false,
		activeLink: 'home',
	});

	const node = React.useRef(null);

	React.useEffect(() => {
		/**
		 * When we scroll down on previous path and then
		 * change route then scroll distance is kept same
		 * To fix this we put below code in useEffect
		 */
		window.focus();
		document.querySelector('body').scrollTo(0,0);
	}, [pathname]);

	React.useEffect(() => {
		const handleClick = (e) => {
			if (node.current && state.showBox && !node.current.contains(e.target)) {
				setState({
					...state,
					showBox: false,
				});
			}
		};
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [node, state.showBox]);

	const toggleNavDiv = () => {
		setState({
			...state,
			showBox: !state.showBox,
		});
	};

	const renderNavLinks = () => {
		const {activeLink} = state;
		if (width > 800) {
			return (
				<>
					<div className={styles.sideBarLinks}>

						<span onClick={() => scrollToY('home', true)} className={styles.mainTitle}>Crypt4Bits</span>
						<div style={{marginBottom: 100}} />
						<span
							onClick={() => scrollToY('home')}
							className={activeLink === 'home' ? styles.activeLink : ''}
						>
							Home
						</span>
						<span
							onClick={() => scrollToY('ourWorks')}
							className={activeLink === 'ourWorks' ? styles.activeLink : ''}
						>
							Our Works
						</span>
						<span
							onClick={() => scrollToY('aboutUs')}
							className={activeLink === 'aboutUs' ? styles.activeLink : ''}
						>
							About Us
						</span>
						<span
							onClick={() => scrollToY('contactUs')}
							className={activeLink === 'contactUs' ? styles.activeLink : ''}
						>
							Contact Us
						</span>
						<span
							onClick={() => scrollToY('game')}
							className={activeLink === 'game' ? styles.activeLink : ''}
						>
							Bored?
						</span>						
					</div>					
				</>
			);
		}
		return (
			<>
				<span onClick={() => scrollToY('home', true)} className={styles.mainTitle}>Crypt4Bits</span>
				<div className={styles.sideBarNavBtn}>
					{/* <img src={Images.menuIcon} className={styles.sideBarNavBtnIcon} /> */}
					<MenuButton 
						isOpen={state.showBox}
						onClick={toggleNavDiv}
						strokeWidth="2"
						color="#ffffff"
						transition={{ ease: "easeOut", duration: 0.2 }}
						width="40"
						height="20"
						style={{marginRight: 10}}
					/>
				</div>
				{renderCollapsibleView()}
			</>
		);
	};

	const renderCollapsibleView = () => {
		const {activeLink, showBox} = state;
		const animatedClass = showBox ? styles.animatedClassEnter : styles.animatedClassExit;
		if (width < 800) {
			return (
				<div className={`${styles.fixedAnimatedDiv} ${animatedClass}`} ref={node}>
					<span
						onClick={() => scrollToY('home', true)}
						className={activeLink === 'home' ? styles.activeLinkFloating : ''}
					>
						Home
					</span>
					<span
						onClick={() => scrollToY('ourWorks', true)}
						className={activeLink === 'ourWorks' ? styles.activeLinkFloating : ''}
					>
						Our Works
					</span>
					<span
						onClick={() => scrollToY('aboutUs', true)}
						className={activeLink === 'aboutUs' ? styles.activeLinkFloating : ''}
					>
						About Us
					</span>
					<span
						onClick={() => scrollToY('contactUs', true)}
						className={activeLink === 'contactUs' ? styles.activeLinkFloating : ''}
					>
						Contact Us
					</span>
					<span
						onClick={() => scrollToY('game', true)}
						className={activeLink === 'game' ? styles.activeLinkFloating : ''}
					>
						Bored?
					</span>
					{/* Button to hide the div */}
					<div className={styles.sideBarNavBtn} onClick={toggleNavDiv}>
						<img src={Images.cross} className={styles.sideBarCrossBtnIcon} />
					</div>
					{/* Button to hide the div */}

				</div>
			);
		}
		return null;
	};

	const scrollToY = (type, hideSideBar = false) => {
		if (hideSideBar) {
			setState({
				...state,
				showBox: false,
				activeLink: type,
			});
		} else {
			setState({
				...state,
				activeLink: type,
			});
		}
		// then navigate to respective page
		navigate(`/${type}`, { replace: true });
	};

	return (
		<div className={styles.navContainer}>
			<div className={styles.sideBarContainer}>
				{renderNavLinks()}
			</div>
			<AnimatedPageContainer 
				className={styles.childContainer}
				activeLink={state.activeLink}
			>
				{props.children}
			</AnimatedPageContainer>
		</div>
	);
};

export default SideBar;
