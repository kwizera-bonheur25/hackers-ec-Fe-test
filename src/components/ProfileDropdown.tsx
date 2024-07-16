import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProfileDropdownProps {
	image: string | undefined;
}

const ProfileDropdown = ({ image }: ProfileDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="relative inline-block text-left">
			<div>
				<button
					type="button"
					className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					id="options-menu"
					aria-expanded="true"
					aria-haspopup="true"
					onClick={toggleDropdown}
				>
					<img
						src={image}
						alt="User Profile"
						className="h-10 w-10 rounded-full object-cover"
					/>
				</button>
			</div>

			{isOpen && (
				<div
					className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-neutral-white ring-1 ring-black ring-opacity-5"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<div className="py-1" role="none">
						<Link
							to="/profile"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							role="menuitem"
						>
							Profile
						</Link>
						<Link
							to="/logout"
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							role="menuitem"
						>
							Logout
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileDropdown;
