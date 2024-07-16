import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="text-6xl font-bold text-red-500 mb-4">Oops!</h1>
			<p className="text-2xl mb-4">Something went wrong.</p>
			<p className="text-lg mb-8">Please try again later.</p>
			<Link to="/">
				<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200">
					Go to Home
				</button>
			</Link>
		</div>
	);
};

export default ErrorPage;
