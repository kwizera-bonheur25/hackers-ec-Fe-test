import '../index.css';
import Button from '../components/buttons/Button';
import {
	aboutImg,
	gift,
	quality,
	payment,
	message,
	world,
	oneStep,
	benefits,
	cart,
} from '../utils/images';
import Chat from '../components/chat/ChatComponent';

const About = () => {
	return (
		<div className="flex flex-col min-h-screen py-0 gap-6 px-[5%] mt-10 mobile:mt-5 laptop:mt-36">
			<div className=" flex flex-col-reverse gap-7 tablet:flex-row tablet:relative laptop:top-0">
				<div className="flex flex-col ipad:justify-center gap-6 tablet:py-16 tablet:h-[50%] laptop:h-screen relative tablet:w-[100%] tablet:gap-16 ipad:w-[60%] laptop:py-0 laptop:gap-10">
					<h2 className="text-xl laptop:font-semibold font-bold mobile:text-2xl tablet:text-3xl ipad:text-4xl laptop:text-5xl desktop:text-6xl laptop:leading-[90px]">
						Your One-Stop Shop for Everything You Need!
					</h2>
					<p className="text-base laptop:text-lg pr-2">
						From fashion to electronics, home decor to health products, we've
						got you covered with quality items and unbeatable prices. Discover
						endless possibilities and shop with confidence. Our journey began in
						2024 with a simple mission: to bring quality products to customers
						worldwide. Since then, we've grown into a trusted marketplace with
						millions of satisfied customers.
					</p>
					<div className=" relative -top-8">
						<Button
							title="Contact Us"
							url={null}
							otherStyles={
								'rounded-l-full rounded-r-full mt-10 mobile:mt-0 mobile:text-lg'
							}
							buttonType={'button'}
						/>
					</div>
				</div>
				<div className=" w-[60%] absolute top-0 right-0 -bottom-0 flex items-end">
					<img
						src={aboutImg}
						alt="shopping"
						className=" w-full object-contain mobile:object-cover laptop:z-10 laptop:bottom-0 hidden laptop:flex"
					/>
				</div>
			</div>

			<h2 className="text-xl laptop:font-semibold font-bold mobile:text-2xl tablet:text-3xl ipad:text-4xl laptop:text-5xl desktop:text-6xl w-full ml-4">
				We have special services
			</h2>
			<div className="h-fit w-full bg-image grid ipad:grid-cols-4 gap-3 tablet:grid-cols-3 grid-cols-1 pb-14 place-content-center">
				<div className="h-[23rem] w-[100%] rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={gift} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Millions of business offerings</h3>
					<p className="text-[14px]">
						We offer millions of items to select Continuous promotions
						Personalized products.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={quality} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Assured quality and transactions</h3>
					<p className="text-[14px]">
						Ensure production quality from verified suppliers, with your orders
						protected from payment to delivery.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={payment} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Safe Payments</h3>
					<p className="text-[14px]">
						Pay with popular and secure payment methods that are acceptable
						worldwide.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={message} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Public Live chat</h3>
					<p className="text-[14px]">
						Convenient online consultation and message to solve your problem.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={world} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Worldwide Delivery</h3>
					<p className="text-[14px]">
						Supported more than 10 countries. Register to get $ 10 coupons.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={oneStep} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">One-stop trading solution</h3>
					<p className="text-[14px]">
						Order seamlessly from product/supplier search to order management,
						payment, and fulfillment.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={benefits} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Enjoy the benefits</h3>
					<p className="text-[14px]">
						Get curated benefits, such as exclusive discounts, enhanced
						protection, and extra support, to help grow your business every step
						of the way.
					</p>
				</div>
				<div className="h-[23rem] w-full place-content-center rounded-[24px] bg-primary-lightblue m-auto justify-start items-start text-start flex flex-col p-5 gap-5 text-neutral-white">
					<img src={cart} alt="" className="h-20 w-20 object-contain" />
					<h3 className="text-[20px]">Variety of products</h3>
					<p className="text-[14px]">
						Explore products and suppliers for your business from millions of
						offerings worldwide.
					</p>
				</div>
			</div>
			<Chat />
		</div>
	);
};

export default About;
