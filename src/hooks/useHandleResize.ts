import { useEffect, useState } from 'react';

const useHandleResize = () => {
	const [show, setShow] = useState(true);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth < 1022) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [windowWidth]);

	return {
		show,
	};
};

export default useHandleResize;
