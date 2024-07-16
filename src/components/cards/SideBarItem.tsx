import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
	icon: ReactNode;
	link: string;
	text: string;
	active: boolean;
	setActive: (text: string) => void;
}

const SideBarItem = ({ icon, link, text, active, setActive }: Props) => {
	return (
		<li className="w-full my-2 flex-center">
			<Link
				to={link}
				onClick={() => setActive(text)}
				className={`flex items-center gap-3 w-full px-6 py-4 
          ${active ? 'bg-primary-lightblue text-neutral-white transition-colors' : ''}`}
			>
				{icon}
				<span
					className={`text-sm font-medium ${active ? 'text-neutral-white' : 'text-neutral-black'} font-semibold`}
				>
					{text}
				</span>
			</Link>
		</li>
	);
};

export default SideBarItem;
