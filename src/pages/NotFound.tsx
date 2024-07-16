import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notfoundgif } from '../utils/images';

const NotFound = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			navigate(-1);
		}, 2000);

		return () => clearInterval(interval);
	}, [navigate]);

	return (
		<div className="w-full h-screen flex justify-center items-center flex-col gap-5">
			<img src={notfoundgif} className="w-[250px]" />
			<h1 className="text-2xl ipad:text-4xl font-bold text-center text-gray-600">
				Sorry! Page Not Found!
			</h1>
		</div>
	);
};

export default NotFound;
