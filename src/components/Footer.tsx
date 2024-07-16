import { roundedLogo } from '../utils/images';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
	return (
		<>
			<footer className="flex flex-col items-center text-dark pb-8 px-[3%]">
				<div className="bg-custom-gradient rounded-md text-neutral-white mx-auto p-10 flex w-full gap-5 rounded-br-[3rem] rounded-bl-[3rem] flex-wrap ipad:flex-nowrap">
					<div className="ipad:w-[40%] w-full">
						<div className="bg-neutral-white rounded-lg p-5 col-span-1 flex flex-col justify-center items-center">
							<img
								src={roundedLogo}
								alt="footer"
								className="w-20 ipad:w-32 mb-4"
							/>
							<div className="text-center">
								<h1 className="text-2xl ipad:text-3xl text-primary-lightblue font-bold">
									ShopTrove
								</h1>
								<p className="text-neutral-black">
									With secure payments and fast delivery
								</p>
								<p className="text-neutral-black">
									ShopTrove makes shopping a breeze.
								</p>
							</div>
						</div>
					</div>
					<div className="content_wrapper w-full">
						<div className="products_wrapper flex-wrap mobile:flex-nowrap flex items-star justify-between ipad:justify-between ipad:px-[8%] gap-2 w-full">
							<div className="products_container flex flex-col gap-4 text-sm mobile:text-xl flex-1">
								<h1 className="text-lg phone:text-xl font-bold">Products</h1>
								<div className="products flex flex-col gap-2">
									<span>Air Force 1</span>
									<span>BMW 7</span>
									<span>Black Jacket</span>
									<span>Jordan 1</span>
								</div>
							</div>
							<div className="help flex flex-col gap-4 text-sm mobile:text-xl flex-1">
								<h1 className="text-lg phone:text-xl font-bold">Help</h1>
								<div className="help_contents flex flex-col gap-2">
									<span>Contact us</span>
									<span>How it works</span>
									<span>Payments</span>
								</div>
							</div>
							<div className="get_in_touch w-full flex flex-col gap-4 text-sm mobile:text-xl flex-1">
								<h1 className="text-lg phone:text-xl font-bold">
									Get in touch
								</h1>
								<div className="in_touch_content flex flex-col gap-4">
									<a href="">hackers@gmail.com</a>
									<span>+250788888888</span>
									<div className="social_media flex gap-2">
										<FaInstagram />
										<FaTwitter />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<p className="text-dark p-1 text-center">
					&copy; Copyright. All rights reserved.
				</p>
			</footer>
		</>
	);
};
export default Footer;
