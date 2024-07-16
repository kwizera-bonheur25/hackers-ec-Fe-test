import { FaCheckCircle } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import { useAppSelector } from '../../redux/hooks/hooks';
import Button from '../buttons/Button';

const VerifiedCard = () => {
	const { isLoading, isVerified, message } = useAppSelector(
		(state) => state.verifyAccount,
	);
	return (
		<div className="relative bgImage w-full h-screen flex-center">
			<div className=" absolute h-full w-full top-0 left-0 bg-neutral-black/65" />
			<div className=" bg-neutral-white px-8 mobile:px-20 flex flex-col w-[85%] gap-7 mobile:w-[85%] laptop:w-[45%] py-9 z-50 rounded-2xl">
				<>
					<div className="pt-0 w-full flex-center flex-col gap-2">
						{isVerified && !isLoading ? (
							<div className=" flex-center w-[50%] h-[50%] mobile:w-[45%] laptop:w-[35%] laptop:h-[35%] mobile:h-[45%]">
								<FaCheckCircle color="#1D8E36" size="100%" />
							</div>
						) : isLoading ? (
							<div className=" bg-neutral-grey w-24 h-24 mobile:w-32 mobile:h-32 laptop:w-36 laptop:h-36 rounded-full" />
						) : (
							<div className=" flex-center w-[50%] h-[50%] mobile:w-[45%] laptop:w-[35%] laptop:h-[35%] mobile:h-[45%]">
								<IoMdCloseCircle color="#E53835" size="100%" />
							</div>
						)}
						<h1 className=" text-4xl font-semibold">
							{isVerified && !isLoading ? (
								'Verified successfully!!'
							) : isLoading ? (
								<h1 className="bg-neutral-grey w-36 mobile:w-48 h-6 mobile:h-10 rounded-md" />
							) : (
								'Error'
							)}
						</h1>
					</div>
					<div className=" w-full flex flex-col gap-2 flex-center">
						<div className=" text-center w-full flex-center mobile:text-3xl">
							{isLoading ? (
								<div className="bg-neutral-grey w-52 mobile:w-[80%] h-4 mobile:h-7 rounded-md" />
							) : (
								<div className="text-xl">
									{message || 'Something went wrong'}
								</div>
							)}
						</div>
						{isLoading ? (
							<div className=" bg-neutral-grey w-56 mobile:w-full h-8 mobile:h-12 rounded-md" />
						) : isVerified ? (
							<Button
								url="/login"
								otherStyles="w-full h-12 text-xl rounded-xl"
								buttonType="button"
								title="LOGIN"
								color="bg-action-success"
							/>
						) : (
							<Button
								url="/"
								otherStyles="w-full h-12 text-xl rounded-xl"
								buttonType="button"
								title="Return to home"
								color="bg-action-error"
							/>
						)}
					</div>
				</>
			</div>
		</div>
	);
};

export default VerifiedCard;
