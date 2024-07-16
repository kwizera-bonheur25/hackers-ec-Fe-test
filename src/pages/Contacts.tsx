import { IoLocationOutline } from 'react-icons/io5';
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa6';
import { FaLinkedinIn } from 'react-icons/fa6';
import useHandleResize from '../hooks/useHandleResize';
import Chat from '../components/chat/ChatComponent';

const Contacts = () => {
	const { show } = useHandleResize();
	return (
		<>
			<div
				className={`w-full h-screen flex ${!show ? 'items-center' : 'items-end pb-10 mt-[10rem]'} my-40 justify-center ipad:my-0 mobile:my-24`}
			>
				<div className="flex w-[100%] flex-col laptop:flex-row py-6 px-[5%] gap-10 ipad:flex-row">
					{show && (
						<div className="laptop:w-[50%] w-full laptop:h-full bg-contactImage text-neutral-white tablet:px-10 tablet:gap-10 text-wrap flex flex-col px-6 h-full py-16  gap-6 rounded-3xl">
							<h1 className="text-2xl font-bold ">Get In Touch</h1>
							<p className="text-[14px] font-light">
								Have questions or need assistance? Reach out, and let's create a
								universe of possibilities together!
							</p>

							<div className="flex gap-4 items-center laptop:text-2xl">
								<IoLocationOutline className="text-neutral-white text-4xl  tablet:text-5xl laptop:text-3xl" />
								<p className="text-[14px] font-light">
									123 Main Street, New York, NY 10001
								</p>
							</div>
							<div className="flex gap-4 items-center">
								<BsTelephone className="text-neutral-white text-2xl tablet:text-4xl laptop:text-2xl" />
								<p className="text-[14px] font-light">+1 123-456-7890</p>
							</div>
							<div className="flex gap-4 items-center">
								<HiOutlineMail className="text-neutral-white text-2xl tablet:text-4xl laptop:text-2xl" />
								<p className="text-[14px] font-light text-wrap">
									aphrogarrix250@gmail.com
								</p>
							</div>

							<div className="mt-auto">
								<div className="flex gap-12 mt-2 tablet:gap-16">
									<FaFacebookF className="text-neutral-white text-2xl " />
									<FaInstagram className="text-neutral-white text-2xl" />
									<FaLinkedinIn className="text-neutral-white text-2xl" />
									<FaXTwitter className="text-neutral-white text-2xl" />
								</div>
							</div>
						</div>
					)}
					<div className=" gap-6 mt-1 laptop:gap-5 laptop:w-[50%] w-full flex flex-col laptop:px-5 laptop:h-full justify-between ">
						<form className=" gap-6 laptop:gap-5 w-full flex flex-col laptop:h-full justify-between ">
							<input
								type="text"
								placeholder="Last name"
								className="px-8 py-2 rounded-md bg-inputBg text-inputCaption "
							/>
							<input
								type="text"
								placeholder="First name"
								className="px-8 py-2 rounded-md bg-inputBg text-inputCaption"
							/>
							<input
								type="text"
								placeholder="Subject"
								className="px-8 py-2 rounded-md bg-inputBg text-inputCaption"
							/>
							<input
								type="text"
								placeholder="Email"
								className="px-8 py-2 rounded-md bg-inputBg text-inputCaption"
							/>
							<textarea
								placeholder="Message"
								className="px-8 py-2 rounded-md bg-inputBg text-inputCaption  h-[200px]"
							/>
							<button className="bg-custom-gradient text-neutral-white w-[100%] h-[44px] rounded-[10px]">
								Send Message
							</button>
						</form>
					</div>
				</div>
			</div>
			<Chat />
		</>
	);
};

export default Contacts;
