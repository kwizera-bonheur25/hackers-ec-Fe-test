import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/register-login-background.svg';
import UserRedirectionInput from '../components/redirections/UserRedirectionInput';
import { useAppSelector } from '../redux/hooks/hooks';

const SellerRedirection = () => {
	const navigate = useNavigate();
	const { requires2FA } = useAppSelector((state) => state.login);

	useEffect(() => {
		if (!requires2FA) {
			navigate('/login');
		}
	}, [requires2FA, navigate]);

	return (
		<>
			{requires2FA ? (
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
										text="Email Sent"
										otherStyles="text-2xl font-bold mb-4 text-green-600"
									/>
									<UserRedirectionInput
										text="
 						Email sent for verification. Please check your inbox and follow
							instructions to complete the authentication process.
 					"
										otherStyles="mb-4 text-gray-700 text-sm"
									/>
									<UserRedirectionInput
										text="
 						 If you don't
							see the email in your inbox, please check your spam.
 					"
										otherStyles="mb-4 text-gray-700 text-sm"
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

export default SellerRedirection;
