import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function UserProfileSideBox() {
	const location = useLocation();
	const [active, setActive] = useState(location.pathname);

	const handleClick = (path: string) => {
		setActive(path);
	};

	return (
		<div className="flex flex-col gap-3 w-[10rem] font-bold bg-neutral-white rounded shadow relative tablet:mb-auto">
			<p
				className={`relative text-center cursor-pointer ${
					active === '/profile' ? 'text-primary-lightblue' : ''
				} hover:text-primary-lightblue`}
				onClick={() => handleClick('/profile')}
			>
				<Link to="/profile">Profile</Link>
				<span
					className={`absolute left-0 h-full w-2 ${
						active === '/profile' ? 'bg-primary-lightblue' : ''
					} hover:bg-primary-lightblue`}
				></span>
			</p>
			<p
				className={`relative text-center cursor-pointer ${
					active === '/password' ? 'text-primary-lightblue' : ''
				} hover:text-primary-lightblue`}
				onClick={() => handleClick('/password')}
			>
				<Link to="/password">Password</Link>
				<span
					className={`absolute left-0 h-full w-2 ${
						active === '/password' ? 'bg-primary-lightblue' : ''
					} hover:bg-primary-lightblue`}
				></span>
			</p>
		</div>
	);
}

export default UserProfileSideBox;
