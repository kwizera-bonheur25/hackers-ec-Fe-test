import { BellRing } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { FaCheckDouble } from 'react-icons/fa6';
import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { NotificationTypes } from '../../@types/notification';
import { UserInfoTypes } from '../../@types/userType';
import useToken from '../../hooks/useToken';
import {
	addNotification,
	userNotification,
} from '../../redux/features/notificationSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { notificationSound } from '../../utils/images';
import fetchInfo from '../../utils/userDetails';
import NotificationItem from '../cards/NotificationItem';

const Notification = () => {
	const dispatch = useAppDispatch();
	const { accessToken } = useToken();
	const notificationPlayer = useRef<HTMLAudioElement>(null);
	const [notificationActive, setNotificationActive] = useState(false);
	const { notifications, value } = useAppSelector(
		(state) => state.notifications,
	);

	const playAudio = () => {
		notificationPlayer.current?.play();
	};

	useEffect(() => {
		if (accessToken) {
			const { id } = fetchInfo() as UserInfoTypes;
			const socket = io(`${import.meta.env.VITE_API_APP_ROOT_URL}`, {
				transports: ['websocket'],
				auth: {
					token: accessToken,
				},
			});

			socket.on('notifications', (data) => {
				dispatch(userNotification(data));
			});
			socket.on(`notification-${id}`, (notification) => {
				if (notification) {
					dispatch(addNotification(notification));
					toast.success('You have new notification 🔔');
					playAudio();
				}
			});

			return () => {
				socket.disconnect();
			};
		}
	}, [accessToken, dispatch]);

	const sortedNotification = sortNotificationsByDate(
		notifications as unknown as NotificationTypes[],
	);

	return (
		<div className="relative flex-center transition-colors border border-neutral-grey p-2 h-max rounded-lg cursor-pointer hover:bg-neutral-grey/20">
			<BellRing
				size={18}
				onClick={() => setNotificationActive((prev) => !prev)}
				className="cursor-pointer"
				role="img"
				aria-label="bell-image"
			/>
			<audio ref={notificationPlayer} src={notificationSound} />
			{value > 0 && (
				<div
					className="absolute -top-4 -right-4 bg-action-error w-8 text-xs h-8 text-neutral-white rounded-full flex-center"
					aria-label="notification-number"
				>
					{value <= 99 ? value : '99+'}
				</div>
			)}
			{notificationActive && (
				<div
					className="absolute top-full -right-[100px] ipad:-right-[50px] mt-5 p-2 bg-neutral-white shadow-inner-bottom rounded-xl w-[80vw] ipad:w-[350px] h-[80vh] md:h-[70vh] z-50"
					aria-label="notification-tab"
				>
					<div className="w-full h-full overflow-hidden">
						<h2 className="text-md ipad:text-lg font-semibold text-start pl-4">
							Notifications
						</h2>
						<div className="flex items-center justify-end p-5">
							<div className="flex items-center gap-2 text-[11px] text-neutral-black bg-primary-lightblue/20 px-3 py-1 rounded-full hover:text-neutral-black/50">
								Mark all as read
								<FaCheckDouble fill={'black'} />
							</div>
						</div>
						<div className="w-full flex-1 h-[90%] overflow-y-scroll no-scrollbar px-2 pb-10">
							{sortedNotification && sortedNotification.length > 0 ? (
								sortedNotification.map((item) => (
									<NotificationItem
										key={item.id}
										unread={item.unread}
										text={item.message}
										date={`${item.createdAt.getHours()}:${item.createdAt.getMinutes() < 10 ? `0${item.createdAt.getMinutes()}` : item.createdAt.getMinutes()} - ${item.createdAt.getDate()}/${item.createdAt.getMonth()}`}
									/>
								))
							) : (
								<div className="text-xs p-4 text-center">
									No new notification available!
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

function sortNotificationsByDate(
	noties: NotificationTypes[],
): NotificationTypes[] {
	return noties
		.map((notification) => ({
			...notification,
			createdAt: new Date(notification.createdAt),
		}))
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export default Notification;
