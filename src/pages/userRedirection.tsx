import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/register-login-background.svg';
import UserRedirectionInput from '../components/Redirection/userRedirectionInput';
import { useAppSelector } from '../redux/hooks/hooks';

const UserRedirection = () => {
	const navigate = useNavigate();
	const { isResetPassword } = useAppSelector((state) => state.forgotPassword);
	useEffect(() => {
		if (!isResetPassword) {
			navigate('/login');
		}
	}, [isResetPassword, navigate]);

	return (
		<>
			{isResetPassword ? (
				<>
					<div
						className="relative h-screen flex items-center justify-center"
						style={{
							backgroundImage: `url(${backgroundImage})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					>
						<div className="bg-neutral-black/70 w-full h-[100%] items-center justify-center flex m-auto">
							<div className=" absolute max-w-md  p-6 bg-white shadow-lg rounded-lg text-center bg-neutral-white w-[80%] mobile:w-full">
								<div className=" inset-0  flex items-center justify-center ">
									<div className="bg-action-success rounded-full p-3">
										<svg
											className="w-12 h-12 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									</div>
								</div>
								<div className="my-5">
									<UserRedirectionInput
										text="Password Reset Email Sent"
										otherStyles="text-4xl font-bold mb-4 text-green-600"
									/>
									<UserRedirectionInput
										text="
Please check your inbox for instructions to reset your password.
"
										otherStyles="mb-4 text-gray-700 text-sm"
									/>

									<UserRedirectionInput
										text="
    		If you can’t find the email, check your spam folder.
    	"
										otherStyles="text-sm"
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default UserRedirection;
