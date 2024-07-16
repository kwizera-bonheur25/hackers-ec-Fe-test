import { useEffect } from 'react';
import { IoCart, IoMenu } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import LandingPageModel from '../components/LandingPageModel';
import { toggleModel } from '../redux/features/navSlice';
import { manipulateSearchInput } from '../redux/features/SearchSlice';
import { fetchUserProfile } from '../redux/features/userUpdateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { nav_logo, nav_logo_mobile } from '../utils/images';
import { ButtonIcon } from './buttons/ButtonIcon';
import Notification from './notification/Notification';
import ProfileDropdown from './ProfileDropdown';

const Nav = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const accessToken = localStorage.getItem('access_token') || '';
	const dispatch = useAppDispatch();
	const openModel = useAppSelector((state) => state.nav.openModel);

	const { data } = useAppSelector((state) => state.profile) || {};
	const { numberOfItem } = useAppSelector((state) => state.cart);

	// Fetch user data when the component mounts
	useEffect(() => {
		if (!data && accessToken) {
			dispatch(fetchUserProfile());
		}
	}, [data, dispatch]);

	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/products', label: 'Product' },
		{ to: '/about', label: 'About Us' },
		{ to: '/contacts', label: 'Contact Us' },
	];

	return (
		<>
			<LandingPageModel
				openModel={openModel}
				toggleModel={() => dispatch(toggleModel())}
			/>

			<nav className="parent_div fixed top-0 left-0 w-full bg-neutral-white z-20">
				<div className="wrapper flex gap-4 ipad:gap-0 laptop:gap-10">
					<div className="logo w-[50%] bimobile:w-[30%] ipad:w-[30%]">
						<img
							src={nav_logo}
							alt="nav_logo"
							className="nav_logo hidden ipad:flex w-full h-full"
						/>
						<img
							src={nav_logo_mobile}
							alt="nav_logo_mobile"
							className="nav_logo_mobile ipad:hidden w-full h-full"
						/>
					</div>
					<div className="navigations flex items-center w-full bg-neutral-darkRe justify-between gap-10 mr-[5%]">
						<div className="left_navigations ipad:flex flex-col gap-4 flex-1 hidden py-2">
							<div className="search w-full flex py-2">
								<form className="flex w-full justify-between mobile:mx-[10%] gap-5 tops">
									<input
										type="text"
										placeholder="Search..."
										className="rounded-l-full rounded-r-full border-2 border-primary-lightblue flex-1 py-1 px-4"
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											e.target.value
												? dispatch(
														manipulateSearchInput({ name: e.target.value }),
													)
												: dispatch(manipulateSearchInput({ name: null }))
										}
									/>
									<ButtonIcon className="mobile:py-1 px-10"> Search</ButtonIcon>
								</form>
							</div>
							<div className="nav flex justify-between  pb-4">
								{links.map((link) => (
									<NavLink
										key={link.to}
										to={link.to}
										className={({ isActive }) =>
											`text-lg font-bold py-1 px-10 rounded-r-full rounded-l-full ${
												isActive ? 'bg-custom-gradient text-neutral-white' : ''
											}`
										}
									>
										{link.label}
									</NavLink>
								))}
							</div>
						</div>
						<div className="right_navigations w-full ipad:w-max flex items-center justify-end gap-6">
							<Link to={'/carts'}>
								<div className="cart relative">
									<IoCart className="text-3xl mobile:text-xl ipad:text-3xl text-primary-lightblue" />
									{numberOfItem > 0 ? (
										<span
											data-testid="number-of-item"
											className="bg-neutral-darkRed text-sm mobile:text-base p-1 absolute -top-3 -right-3 rounded-full flex items-center justify-center text-neutral-white font-semibold mobile:w-6 w-5 h-5 mobile:h-6"
										>
											{numberOfItem}
										</span>
									) : null}
								</div>
							</Link>

							{accessToken ? (
								<>
									<Notification />
									<ProfileDropdown image={data?.profileImage} />
								</>
							) : (
								<Link to={'/login'}>
									<ButtonIcon className="py-1 mobile:text-sm mobile:px-7 mobile:py-2">
										Login
									</ButtonIcon>
								</Link>
							)}
							<IoMenu
								className="ipad:hidden text-4xl bg-custom-gradient mobile:w-12 w-8 h-8 mobile:h-12 p-2 rounded-full text-neutral-white"
								onClick={() => dispatch(toggleModel())}
							/>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
