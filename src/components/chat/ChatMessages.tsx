import { DynamicData } from '../../@types/DynamicData';

const ChatMessages = ({ index, message, id }: DynamicData) => {
	return (
		<div
			key={index}
			className={`msgs p-3 rounded-xl flex items-start gap-2 ${
				message.sender.id === id
					? 'bg-blue-500 text-white self-end'
					: 'bg-gray-200 text-black self-start'
			}`}
		>
			<div>
				<h1 className="font-bold text-xl">
					{message.sender.id !== id ? message.sender.firstName : null}
				</h1>
				<p
					className={`${message.sender.id === id ? `p-3 rounded-l-xl rounded-br-xl text-xl bg-[#266591] text-[#fff]` : `p-3 rounded-r-xl rounded-bl-xl text-xl bg-[#EAF0F6] text-black`}`}
				>
					{message.message}
				</p>
			</div>
		</div>
	);
};

export default ChatMessages;
