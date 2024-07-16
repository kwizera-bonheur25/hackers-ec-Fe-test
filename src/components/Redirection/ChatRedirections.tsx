import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { chartRejectVariants } from '../../utils/variants';
import { ButtonIcon } from '../buttons/ButtonIcon';

const ChatRedirections = () => {
	return (
		<AnimatePresence>
			<motion.div
				className="parent fixed inset-0 w-full h-full bg-neutr backdrop-blur-sm z-30
				 flex flex-col items-center justify-center"
				variants={chartRejectVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<div className="laptop:w-1/2 desktop:w-1/3 mobile:w-3/4 w-4/5 h-2/6 p-5 rounded-lg bg-neutral-white _shadow flex flex-col justify-around">
					<h2 className="text-center text-2xl">Welcome!</h2>
					<p className="m-2 text-center text-lg">
						Log in to share ideas, ask questions, and engage with our global
						community. Join us!
					</p>
					<div className="mt-2 flex items-center w-full justify-center">
						<Link to={'/login'}>
							<ButtonIcon className="py-1 mobile:text-sm mobile:px-7 mobile:py-2">
								Login
							</ButtonIcon>
						</Link>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default ChatRedirections;
