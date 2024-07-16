import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';

type NotificationState = {
	notifications: Array<DynamicData> | null;
	value: number;
};

const initialState: NotificationState = {
	notifications: [],
	value: 0,
};

const notificationSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		userNotification: (state, action: PayloadAction<Array<DynamicData>>) => {
			state.notifications = action.payload;
			state.value = action.payload.length;
		},
		addNotification: (state, action: PayloadAction<DynamicData>) => {
			state.notifications = [action.payload, ...state.notifications!];
			state.value += 1;
		},
	},
});

export const { userNotification, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
