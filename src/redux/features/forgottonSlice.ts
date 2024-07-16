/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForgotPasswordType } from '../../validations/forgottenPassword/forgotten.password.validation';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';

interface ForgotPasswordState {
	isLoading: boolean;
	isResetPassword: boolean;
	error: string | null;
}

export const forgotPassword = createAsyncThunk(
	'forgotPassword',
	async (forgotPasswordData: ForgotPasswordType, { rejectWithValue }) => {
		try {
			const { data } = await API.post(
				'/users/forgot-password',
				forgotPasswordData,
			);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: ForgotPasswordState = {
	isLoading: false,
	isResetPassword: false,
	error: null,
};

const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(forgotPassword.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(forgotPassword.fulfilled, (state) => {
			state.isLoading = true;
			state.isResetPassword = true;
			state.error = null;
		});

		builder.addCase(
			forgotPassword.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.isResetPassword = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default forgotPasswordSlice.reducer;
