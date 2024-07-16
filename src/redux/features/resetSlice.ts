/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';
import { ResetPasswordPayload } from '../../validations/resetPassword/reset.password.validation';

interface ResetPasswordState {
	isLoading: boolean;
	error: string | null;
}

interface ResetPasswordWithToken extends ResetPasswordPayload {
	token: string;
}

export const resetPassword = createAsyncThunk(
	'resetPassword',
	async ({ password, token }: ResetPasswordWithToken, { rejectWithValue }) => {
		try {
			const { data } = await API.post(`/users/reset-password/${token}`, {
				password,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: ResetPasswordState = {
	isLoading: false,
	error: null,
};

const resetPasswordSlice = createSlice({
	name: 'resetPassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(resetPassword.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(resetPassword.fulfilled, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(
			resetPassword.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default resetPasswordSlice.reducer;
