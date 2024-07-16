import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';

type ChatStateTypes = {
	chat: Array<DynamicData> | null;
};

const initialState: ChatStateTypes = {
	chat: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		chats: (state, action: PayloadAction<Array<DynamicData>>) => {
			state.chat = action.payload;
		},
		addChat: (state, action: PayloadAction<DynamicData>) => {
			state.chat?.push(action.payload);
		},
	},
});

export const { chats, addChat } = chatSlice.actions;

export default chatSlice.reducer;
