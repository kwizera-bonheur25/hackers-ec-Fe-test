import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackBtnType {
	url?: string;
	isBordered?: boolean;
	otherStyles?: string;
	title: string;
}

const BackButton = ({ url, isBordered, otherStyles, title }: BackBtnType) => {
	const navigate = useNavigate();

	const handleNavigation = () => {
		if (url) {
			navigate(url);
		} else {
			navigate(-1);
		}
	};
	return (
		<button
			onClick={handleNavigation}
			className={`flex-center text-xs ${
				isBordered
					? 'border border-overlay text-neutral-black/55 py-2 px-3.5 rounded-lg bg-overlay/25 hover:bg-overlay/35 shadow-inner'
					: ''
			} ${otherStyles}`}
		>
			<ChevronLeft size={18} /> {title}
		</button>
	);
};

export default BackButton;
