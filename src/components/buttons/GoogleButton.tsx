import { googleIcon } from '../../utils/images';
const baseurl = `${import.meta.env.VITE_API_BASE_URL}`;

const GoogleButton: React.FC = () => {
	const handleGoogleLogin = () => {
		window.location.href = `${baseurl}/users/auth/google`;
	};

	return (
		<button
			type="button"
			onClick={handleGoogleLogin}
			className="w-full border border-neutral-grey hover:bg-neutral-grey/15 button-size rounded-xl flex-center gap-3"
		>
			<img src={googleIcon} alt="Google icon" className="w-[20px]" />
			<div>Continue with Google</div>
		</button>
	);
};

export default GoogleButton;
