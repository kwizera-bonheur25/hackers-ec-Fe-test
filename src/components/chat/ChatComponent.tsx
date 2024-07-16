import { useState } from 'react';
import { HiMiniChatBubbleLeftRight } from 'react-icons/hi2';
import { VscChromeClose } from 'react-icons/vsc';
import ChatModal from './ChatModal';

const ChatComponent = () => {
	const [chatModal, setChatModal] = useState(false);
	const toggleChatModal = () => {
		setChatModal(!chatModal);
	};

	return (
		<div className="chat fixed right-0 h-screen bottom-0 z-20">
			{chatModal ? (
				<div
					className="chatting laptop:hidden laptop:w-16 w-10 laptop:h-16 h-10 bg-action-warning absolute top-16 mobile:top-20 laptop laptop:mt-0 mt-3 mobile:mt-6 tablet:mt-10 laptop:right-10 right-2 z-50 rounded-full flex flex-col items-center justify-center"
					onClick={toggleChatModal}
				>
					<VscChromeClose className="text-4xl" data-testid="close-icon" />
				</div>
			) : (
				<div
					className="chatting flex laptop:hidden w-16 h-16 bg-action-warning absolute bottom-10 right-10 z-50 rounded-full flex-col items-center justify-center"
					onClick={toggleChatModal}
				>
					<HiMiniChatBubbleLeftRight
						className="text-4xl"
						data-testid="chat-bubble-icon"
					/>
				</div>
			)}
			<div
				className="chatting laptop:flex hidden w-16 h-16 bg-action-warning absolute bottom-4 desktop:bottom-10 right-10 z-50 rounded-full flex-col items-center justify-center"
				onClick={toggleChatModal}
			>
				{chatModal ? (
					<VscChromeClose className="text-4xl" />
				) : (
					<HiMiniChatBubbleLeftRight className="text-4xl" />
				)}
			</div>
			{chatModal && <ChatModal />}
		</div>
	);
};

export default ChatComponent;
