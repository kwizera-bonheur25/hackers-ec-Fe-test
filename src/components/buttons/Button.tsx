import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
	disabled?: boolean;
	color?: string;
	url: string | null;
	otherStyles: string;
	title: string | ReactNode;
	buttonType: 'submit' | 'reset' | 'button';
}

const Button: React.FC<ButtonProps> = ({
	url,
	title,
	color,
	buttonType,
	otherStyles,
	disabled = false,
}) => {
	return (
		<button
			type={buttonType}
			className={`transition duration-100 ease-in-out ${
				color ? `${color}` : 'bg-custom-gradient hover:scale-105'
			} text-neutral-white button-size ${otherStyles}`}
			disabled={disabled}
		>
			{!url ? (
				<span className="flex-center">{title}</span>
			) : (
				<Link to={url} className="flex-center">
					{title}
				</Link>
			)}
		</button>
	);
};

export default Button;
