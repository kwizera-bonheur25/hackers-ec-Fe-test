/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface UsersState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
}

const initialState: UsersState = {
	data: [],
	isLoading: false,
	error: null,
};

export const getUser = createAsyncThunk(
	'fetchUser',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/users');
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const getUsersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.data = [...state.data, action.payload];
			state.error = null;
		});
		builder.addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

export default getUsersSlice.reducer;
