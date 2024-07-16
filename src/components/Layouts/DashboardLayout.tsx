/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import SideBarItem from '../cards/SideBarItem';
import DashboardSideNav from '../DashboardSideNav';
import DashboardTopNav from '../DashboardTopNav';
import { DynamicData } from '../../@types/DynamicData';
import useHandleResize from '../../hooks/useHandleResize';
import { Outlet } from 'react-router-dom';
import { sideBarItems } from '../../utils/sideBarItems';
import { useAppDispatch } from '../../redux/hooks/hooks';
import fetchInfo from '../../utils/userDetails';
import { UserInfoTypes } from '../../@types/userType';

interface currentUserType {
	role: string;
}

export const toggleMenuContext = createContext<DynamicData>({});

const DashboardLayout = () => {
	const [activeItem, setActiveItem] = useState<string>('Dashboard');
	const [showMenu, setShowMenu] = useState(false);
	const { show } = useHandleResize();
	const [currentUser, setCurrentUser] = useState<currentUserType>({
		role: '',
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		const meth = async () => {
			const User: UserInfoTypes = fetchInfo() || {};
			if (User) {
				setCurrentUser({
					role: User.role as string,
				});
			}
		};
		meth();
	}, [dispatch]);

	return (
		<div className="w-full h-screen flex overflow-hidden">
			{
				<DashboardSideNav
					role={currentUser.role}
					otherStyles={`${showMenu || show ? 'w-[300px]' : 'w-0 overflow-hidden'}`}
				>
					{sideBarItems
						.filter((item) => item.scope.includes(currentUser.role))
						.map((item) => (
							<SideBarItem
								key={item.name}
								icon={item.icon}
								link={item.path}
								text={item.name}
								active={activeItem === item.name}
								setActive={setActiveItem}
							/>
						))}
				</DashboardSideNav>
			}
			<div className="flex-1 h-full bg-primary-lightblue/10">
				<toggleMenuContext.Provider value={{ setShowMenu, showMenu }}>
					<DashboardTopNav />
				</toggleMenuContext.Provider>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
