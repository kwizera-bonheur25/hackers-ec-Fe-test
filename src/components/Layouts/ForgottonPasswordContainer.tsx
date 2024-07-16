import { ReactNode } from 'react';
import { registerLoginBackground, roundedLogo } from '../../utils/images';

const ForgottonPasswordContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="w-full h-screen relative flex items-center  justify-center"
			style={{
				backgroundImage: `url(${registerLoginBackground})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}
		>
			<div className="absolute top-0 left-0 bg-neutral-black/70 w-full h-full" />
			<div className="absolute z-10 p-4 w-[90%] h-[95%] bg-neutral-white mx-8 px-6 py-10 rounded-3xl flex flex-col gap-4 items-center justify-center mobile:z-auto  mobile:w-[77%] mobile:h-[70%]  ipad:w-[50%] ipad:h-[76%] laptop:w-[48%] ">
				<div className="flex justify-center w-max h-max mb-8">
					<img src={roundedLogo} alt="ShopTrove logo" className="w-[60%]" />
				</div>

				<h1 className="text-2xl mb-4 font-poppins font-semibold text-center tracking-tighter">
					Enter your email
				</h1>
				<div className="flex flex-col gap-8 mobile:w-[60%]">{children}</div>
			</div>
		</div>
	);
};

export default ForgottonPasswordContainer;
