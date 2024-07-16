import { useState } from 'react';
import { NotificationItemTypes } from '../../@types/notification';

const NotificationItem = ({ text, date, unread }: NotificationItemTypes) => {
	const [expanded, setExpanded] = useState(false);
	const [notificationText, setNotificationText] = useState(
		text.length > 100 ? `${text.substring(0, 100)}...` : text,
	);

	const changeTextLength = () => {
		if (expanded) {
			setNotificationText(`${text.substring(0, 100)}...`);
			setExpanded(false);
		} else {
			setNotificationText(text);
			setExpanded(true);
		}
	};

	return (
		<div
			className={`p-5 w-full my-2 bg-neutral-white rounded-xl relative shadow-dark-lg`}
		>
			<div className="p-2 rounded-full bg-neutral-grey absolute right-2 top-5" />
			<div className="h-[90%] border-l border-neutral-grey rounded-full absolute right-4 top-2" />
			<div
				className={`text-xs text-neutral-grey text-end w-full flex items-center justify-start`}
			>
				{unread && (
					<div className="py-1 px-3 rounded-full bg-action-success/20">New</div>
				)}
				{/* <div>
					<X />
				</div> */}
			</div>
			<div className="h-max w-full text-xs py-2 transition-transform">
				{notificationText}
				{text.length > 100 && (
					<>
						<br />
						<br />
						<span onClick={changeTextLength} className="font-semibold">
							{expanded ? 'show less' : 'see more'}
						</span>
					</>
				)}
			</div>
			<div className="w-full flex items-center justify-start text-[9px] mt-3">
				<div className="py-0.5 px-3 bg-inputCaption/50 rounded-full text-neutral-white">
					{date}
				</div>
			</div>
		</div>
	);
};

export default NotificationItem;
