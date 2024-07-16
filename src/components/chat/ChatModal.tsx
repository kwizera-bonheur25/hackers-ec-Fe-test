import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';
import useToken from '../../hooks/useToken';
import { addChat, chats } from '../../redux/features/chatSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import fetchInfo from '../../utils/userDetails';
import { chatModalVariants } from '../../utils/variants';
import {
	chatInputType,
	chatInputValidations,
} from '../../validations/chat/chatInputValidations';
import ChatRedirections from '../Redirection/ChatRedirections';
import ChatMessages from './ChatMessages';

const ChatModal = () => {
	const dispatch = useAppDispatch();
	const { chat } = useAppSelector((state) => state.chat);
	const { accessToken } = useToken();
	const socket = useRef<Socket | null>(null);
	const user = fetchInfo();
	const id = user?.id;
	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};
	useEffect(() => {
		if (accessToken) {
			socket.current = io(`${import.meta.env.VITE_API_APP_ROOT_URL}`, {
				transports: ['websocket'],
				auth: {
					token: accessToken,
				},
			});

			socket.current.on('connect', () => {
				toast.success('You are live. feel free to chat');
			});

			socket.current.on('chat messages', (msg: []) => {
				dispatch(chats(msg));
				scrollToBottom();
			});

			socket.current.on('new message', (data: []) => {
				dispatch(addChat(data));
				scrollToBottom();
			});

			socket.current.on('disconnect', () => {
				toast.warning('You left the chat. feel free to come back any time');
			});

			return () => {
				if (socket.current) {
					socket.current.disconnect();
				}
			};
		}
	}, [accessToken, dispatch]);

	const { register, handleSubmit, reset } = useForm<chatInputType>({
		resolver: zodResolver(chatInputValidations),
	});

	const onSubmit: SubmitHandler<chatInputType> = async (data) => {
		if (socket.current) {
			socket.current.emit('send message', { message: data.message });
		}
		reset();
	};

	useEffect(() => {
		scrollToBottom();
	}, [chat]);

	return (
		<>
			{accessToken ? (
				<div className="h-screen w-full fixed inset-0 z-40 ">
					<motion.div
						className="chat_modal absolute laptop:right-10 z-50 bg-neutral-white w-full laptop:w-[40%] laptop:h-[70%] desktop:h-[60%] desktop:w-[30%] mobile:h-[100%] tablet:h-[100%] h-[95%] top-16 mobile:top-20 tablet:top-24 laptop:top-32 desktop:top-60 laptop:mt-2 desktop:mt-0 shadow-lg rounded-md overflow-hidden _shadow"
						variants={chatModalVariants}
						initial="initial"
						animate="animate"
						exit="exit"
					>
						<div className="top_chat flex items-center gap-4 bg-primary-lightblue text-neutral-white font-bold p-4 _shadow">
							<div className="profile w-5 h-5 rounded-full bg-[#0CFF51]"></div>
							<h1 className="text-xl mobile:text-2xl laptop:text-lg">
								Shop Trove Live Chat
							</h1>
						</div>
						<div className="chat_messages h-[75%] overflow-auto bg-gray-100 px-5 flex flex-col">
							{chat?.map((message, index) => (
								<ChatMessages index={index} message={message} id={id} />
							))}
							<div ref={messagesEndRef} />
						</div>
						<div className="add_message bg-gray-200 p-4 _shadow">
							<form
								className="flex items-center gap-2 w-full rounded"
								onSubmit={handleSubmit(onSubmit)}
							>
								<input
									type="text"
									placeholder="Send message"
									className="flex-1 p-2 bg-[#EAF0F6] rounded text-xl"
									{...register('message')}
								/>
								<button
									type="submit"
									className="bg-primary-lightblue px-4 py-1 rounded text-neutral-white text-xl"
								>
									Send
								</button>
							</form>
						</div>
					</motion.div>
				</div>
			) : (
				<ChatRedirections />
			)}
		</>
	);
};

export default ChatModal;
