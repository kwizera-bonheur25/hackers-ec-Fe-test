import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch } from '../redux/hooks/hooks';
import { manipulateSearchInput } from '../redux/features/SearchSlice';

interface ModalProps {
	openModel: boolean;
	toggleModel: () => void;
}

const LandingPageModel: React.FC<ModalProps> = ({ openModel, toggleModel }) => {
	const dispatch = useAppDispatch();
	return (
		<AnimatePresence>
			{openModel && (
				<motion.div
					className="w-full h-screen backdrop-blur fixed z-50 flex flex-col top-[5%] ipad:top-[10%] p-10 ipad:hidden"
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<motion.div
						className="middle_nav flex-col pt-16 mobile:pt-24 mt-4 mobile:mt-10 py-4 z-50 bg-neutral-white h-full rounded-md shadow"
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<form className="nav_search flex flex-col mobile:flex-row items-center justify-center gap-4 px-4 mobile:px-0">
							<input
								type="text"
								className="border-primary-lightblue border-2 inline-block rounded-r-full rounded-l-full h-8 w-full mobile:w-[60%] px-4"
								placeholder="Search ..."
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									e.target.value
										? dispatch(manipulateSearchInput({ name: e.target.value }))
										: dispatch(manipulateSearchInput({ name: null }))
								}
							/>
							<button onClick={toggleModel}>Search</button>
						</form>
						<div className="w-full flex flex-col items-center">
							<nav className="navigations flex flex-col items-center justify-around mt-10 text-sm mobile:text-base font-semibold w-1/2 p-2 gap-10">
								{['Home', 'Products', 'About', 'Contacts'].map((text) => (
									<motion.div key={text}>
										<NavLink
											to={text === 'Home' ? '/' : `/${text.toLowerCase()}`}
											className="text-2xl w-full py-1 px-4 rounded"
											onClick={toggleModel}
										>
											{text}
										</NavLink>
									</motion.div>
								))}
							</nav>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LandingPageModel;
