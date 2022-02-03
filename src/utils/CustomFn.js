import React, {useState, useEffect} from 'react';

export const filterArray = (apiData, needle, parsedData = []) =>
	new Promise((resolve, reject) => {
		if (apiData.length === 0) {
			resolve(parsedData);
		} else {
			// get first element from apiData
			const ele = apiData.shift();
			if (ele.name.includes(needle)) {
				// if needle exists
				// add the ele to parsedData
				// and remove first element from apiData
				parsedData.push(ele);
			}

			filterArray(apiData, needle, parsedData).then((res) => resolve(res));
		}
	});

export const objectsEqual = (o1, o2) =>
	Object.keys(o1).length === Object.keys(o2).length &&
	Object.keys(o1).every((p) => o1[p] === o2[p]);

export const arraysEqual = (a1, a2) =>
	a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

export const getWindowDimensions = () => {
	const {innerWidth: width, innerHeight: height} = window;
	return {
		width,
		height,
	};
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = React.useState(getWindowDimensions());

	React.useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};

export const useOnScreen = (ref, rootMargin = '0px') => {
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIntersecting(entry.isIntersecting);
			},
			{
				rootMargin,
			},
		);
		if (ref.current) {
			observer.observe(ref.current);
		}
		return () => {
			if (ref.current){
				observer.unobserve(ref.current);
			}
		};
	}, []);

	return isIntersecting;
};
