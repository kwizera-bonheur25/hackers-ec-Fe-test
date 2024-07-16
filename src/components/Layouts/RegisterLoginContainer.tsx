import { ReactNode } from 'react';
import { registerLoginBackground } from '../../utils/images';
const RegisterLoginContainer = ({ children }: { children: ReactNode }) => {
	return (
		<div
			className="w-full h-screen relative flex-center"
			style={{
				backgroundImage: `url(${registerLoginBackground})`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}
		>
			<div className="absolute  top-0 left-0 bg-neutral-black/70 w-full h-full" />
			<div className=" p-6 md:p-8 w-[90%] mobile:w-[75%] ipad:w-[70%] h-[90%] ipad:h-[80%] bg-neutral-white z-50 rounded-3xl flex flex-wrap">
				{children}
			</div>
		</div>
	);
};

export default RegisterLoginContainer;
