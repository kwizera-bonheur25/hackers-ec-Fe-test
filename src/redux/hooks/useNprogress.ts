import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const useNProgress = () => {
	const start = () => {
		NProgress.start();
	};

	const done = () => {
		NProgress.done();
	};

	return { start, done };
};

export default useNProgress;
