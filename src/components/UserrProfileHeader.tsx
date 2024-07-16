import React from 'react';

interface UserProfileHeaderProps {
	image?: string;
	firstName?: string;
	handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UserrProfileHeader({
	image,
	handleImageChange,
	firstName,
}: UserProfileHeaderProps) {
	return (
		<div className="flex justify-around px-8 gap-10 items-center py-4 ipad:w-[50%] tablet:gap-2">
			<div className="bg-custom-gradient absolute w-[100%] h-[20rem] top-[-8rem] rounded-3xl z-0 ipad:rounded-full ipad:h-[35rem] ipad:w-[50%] ipad:top-[-20rem] ipad:rotate-[-10deg]"></div>
			<div className="h-auto tablet:px-6 flex z-10">
				<div className="w-[4rem] tablet:w-[8rem] flex justify-center items-center">
					<img
						src={image}
						alt="profile image"
						className="rounded-full w-24 h-16 tablet:w-96 tablet:h-32 border-4 border-neutral-white"
					/>
				</div>

				<div>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="hidden"
						id="profileImageUpload"
					/>
				</div>
			</div>
			<div className="text-neutral-white mx-4 mt-5 tablet:mx-6 z-10">
				<h1 className="font-semibold text-sm py-2 tablet:text-4xl">
					Hello, {firstName}
				</h1>
				<p className="font-medium text-[0.6rem] tablet:text-[1rem]">
					This is your profile page, feel free to update your personal
					information
				</p>
			</div>
		</div>
	);
}

export default UserrProfileHeader;
