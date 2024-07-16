import { Triangle } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { appLogo } from '../utils/images';
import Button from './buttons/Button';
import { dashProfileIcon } from '../utils/images';

const DashboardSideNav = ({
	children,
	otherStyles,
	role,
}: {
	children: ReactNode;
	otherStyles: string;
	role: string;
}) => {
	const [active, setActive] = useState(false);
	return (
		<aside
			className={`${otherStyles} h-screen bg-neutral-white fixed ipad:sticky top-0 left-0 z-40`}
		>
			<nav className="h-full flex flex-col justify-between border-r border-neutral-grey/30 shadow-sm">
				<div className="p-5 pb-2 flex gap-3 items-center">
					<img src={appLogo} alt="website logo" className="w-16" />
					<h2 className="text-2xl font-semibold">ShopTrove</h2>
				</div>
				<ul className="flex-1 mt-3">{children}</ul>
				<div className="relative flex gap-3 items-center p-3">
					<img src={dashProfileIcon} alt="website logo" className="w-14" />
					<div className="flex flex-col flex-1 p-2">
						<h4 className="text-lg">{role}</h4>
						<p className="text-xs text-neutral-black/60">John Doe</p>
					</div>
					<div
						onClick={() => setActive((curr) => !curr)}
						className="px-1 py-2 cursor-pointer rounded"
					>
						<Triangle
							fill="black"
							size={26}
							className={`${active ? '' : 'rotate-180'}`}
						/>
					</div>
					{active && (
						<div className="absolute bottom-full right-6 mb-6 w-[80%] p-3 bg-primary-lightblue/10 flex-center rounded-lg">
							<Button
								url={null}
								buttonType="button"
								title="Logout"
								color="bg-neutral-darkRed"
								otherStyles="rounded-lg hover:bg-neutral-darkRed/80 w-full"
							/>
						</div>
					)}
				</div>
			</nav>
		</aside>
	);
};

export default DashboardSideNav;
