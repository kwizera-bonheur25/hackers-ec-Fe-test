/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { UserPassword, passwordState } from '../../@types/auth/passwordTypes';

export const updateUserPassword = createAsyncThunk(
	'updatePassword',
	async (password: UserPassword, { rejectWithValue }) => {
		try {
			const response = await API.patch('users/password-update', password);
			const { data } = response;

			return data;
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				return rejectWithValue(error.response.data || 'Bad Request');
			} else {
				return rejectWithValue(error.message);
			}
		}
	},
);
const initialState: passwordState = {
	isLoading: false,
	data: null,
	error: null,
};

const passwordSlice = createSlice({
	name: 'updatePassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(updateUserPassword.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(updateUserPassword.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload.data;
		});
		builder.addCase(
			updateUserPassword.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default passwordSlice.reducer;
