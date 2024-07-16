import { motion } from 'framer-motion';
import {
	backgroundVariants,
	imageVariants,
	textVariants,
} from '../utils/variants';
import { FaShoppingCart } from 'react-icons/fa';
import { ButtonIcon } from '../components/buttons/ButtonIcon';
import About from './About';
import Contacts from './Contacts';
import '../index.css';
import { Link } from 'react-router-dom';
import LandingProduct from './LandingProduct';

const Home = () => {
	return (
		<>
			<div className="parent_container min-h-screen pt-[8rem]">
				<div className="wrapper flex flex-col ipad:flex-row">
					<div className="right_hero flex flex-col gap-4 mobile:gap-6 tablet:gap-10 ipad:justify-center w-full absolute z-10 ipad:z-0 ipad:relative top-[15%] px-[5%]">
						<motion.div
							className="text ipad:absolute ipad:w-[120%] top-[30%] ipad:top-[25%] laptop:top-[20%] desktop:top-[26%] flex flex-col gap-2"
							initial={{ y: '10%', opacity: 1 }}
							animate={{ y: '0%' }}
							transition={{ duration: 1, delay: 1 }}
						>
							<h1 className="text-xl font-bold laptop:font-semibold mobile:text-2xl tablet:text-3xl ipad:text-4xl laptop:text-5xl desktop:text-6xl ipad:pb-10 laptop:pb-6">
								Elevate Your Shopping{' '}
							</h1>
							<div className="flex">
								{'Experience - with ShopTrove!'.split('').map((item, idx) => (
									<motion.h1
										className="text-xl font-bold laptop:font-semibold mobile:text-2xl tablet:text-3xl ipad:text-4xl laptop:text-5xl desktop:text-6xl"
										key={idx}
										custom={idx}
										variants={textVariants}
										initial="hidden"
										animate="visible"
									>
										{item}
									</motion.h1>
								))}
							</div>
						</motion.div>
						<p className="text-base ipad:mt-32 mobile:text-lg">
							An Excellent E-commerce destination! Browse thousands of products
							from top brands, enjoy exclusive deals, and personalized
							recommendations. With secure payments and fast delivery, ShopTrove
							makes shopping a breeze.
						</p>
						<div className="button">
							<ButtonIcon className="tablet:px-20 py-2 mobile:py-3 font-semi-bold tablet:text-xl">
								<Link to={''} className="flex gap-2 items-center">
									<FaShoppingCart /> Explore now{' '}
								</Link>
							</ButtonIcon>
						</div>
					</div>
					<div className="left_hero w-full h-screen relative ipad:ml-0">
						<div className="hero_image_container w-full mobile:w-[90%] tablet:w-[100%] float-right  ipad:w-[140%] laptop:w-[120%] right-0 h-full ipad:absolute">
							<motion.div
								className="hero_background_image w-full h-full"
								variants={backgroundVariants}
								initial="hidden"
								animate="visible"
							>
								<motion.div
									className="hero_image bg-action-succes w-[85%] h-full float-right"
									variants={imageVariants}
									initial="hidden"
									animate="visible"
								></motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
			<LandingProduct />
			<About />
			<Contacts />
		</>
	);
};

export default Home;
