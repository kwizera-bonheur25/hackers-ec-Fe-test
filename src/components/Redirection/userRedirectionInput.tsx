interface TextProps {
	text: string;
	otherStyles?: string;
}

const UserRedirectionInput = ({ text, otherStyles }: TextProps) => {
	return (
		<>
			<p className={otherStyles}>{text}</p>
		</>
	);
};

export default UserRedirectionInput;
