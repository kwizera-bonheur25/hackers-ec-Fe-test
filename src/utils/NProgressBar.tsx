import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const NProgressBar = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();

	useEffect(() => {
		const handleStart = () => {
			NProgress.start();
		};

		const handleStop = () => {
			NProgress.done();
		};

		handleStart();
		handleStop();

		return () => {
			handleStop();
		};
	}, [location.pathname]);

	return <>{children}</>;
};

export default NProgressBar;
