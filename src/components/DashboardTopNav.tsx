import { Menu, Search, X } from 'lucide-react';
import useHandleResize from '../hooks/useHandleResize';
import { useContext } from 'react';
import { toggleMenuContext } from './Layouts/DashboardLayout';
import Notification from './notification/Notification';

const DashboardTopNav = () => {
	const { show } = useHandleResize();
	const { setShowMenu, showMenu } = useContext(toggleMenuContext);

	return (
		<div className="p-5 flex items-center justify-between border-b border-neutral-grey bg-neutral-white">
			<h1 className="text-sm ipad:text-lg text-neutral-black/70 font-light">
				<span className="font-semibold text-neutral-black text-base ipad:text-xl">
					Hello!
				</span>{' '}
				John Doe
			</h1>
			<div className="flex items-center gap-5 mr-5">
				<Notification />
				{show ? (
					<div className="flex-center gap-2 px-2 py-2 border border-neutral-grey bg-neutral-grey/20 rounded-lg">
						<Search size={18} />
						<input
							type="text"
							placeholder="search"
							className="text-sm bg-neutral-grey/0 outline-none"
						/>
					</div>
				) : (
					<div
						className={`${showMenu ? 'border border-primary-lightblue p-1 rounded-full' : ''} p-1 z-50`}
					>
						<div
							onClick={() => setShowMenu((curr: boolean) => !curr)}
							className={`bg-primary-lightblue hover:bg-primary-lightblue/80 text-neutral-white p-2 rounded-full cursor-pointer`}
						>
							{showMenu ? <X /> : <Menu size={25} />}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default DashboardTopNav;
