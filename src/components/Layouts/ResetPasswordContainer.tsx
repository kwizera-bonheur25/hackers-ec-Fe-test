import { ReactNode } from 'react';
import { registerLoginBackground, roundedLogo } from '../../utils/images';

const ResetPasswordContainer = ({ children }: { children: ReactNode }) => {
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
			<div className="absolute z-10 p-4 w-[90%] h-[95%] bg-neutral-white mx-8 px-6 py-10 rounded-3xl flex flex-col gap-2 items-center justify-center mobile:z-auto  mobile:w-[77%] mobile:h-[70%]  ipad:w-[50%] ipad:h-[90%] laptop:w-[48%]  ipad:gap-0 ">
				<div className="flex justify-center w-max h-max mb-8">
					<img src={roundedLogo} alt="ShopTrove logo" className="w-[60%]" />
				</div>
				<h1 className="text-3xl mb-2 mobile:mb-4 mobile:text-4xl font-poppins font-semibold text-center tracking-tighter ipad:mb-3">
					Reset password
				</h1>
				<h3 className="text-sm mb-5 text-center  tablet:text-base ipad:text-xs ipad:mb-8 ">
					Enter your new password in the field <br /> provided the confirm
				</h3>
				<div className="flex flex-col gap-8 mobile:w-[60%]">{children}</div>
			</div>
		</div>
	);
};

export default ResetPasswordContainer;
