/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OTPState } from '../../@types/auth/loginTypes';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';
import { Props } from '../../@types/auth/loginTypes';

export const verifyOTP = createAsyncThunk(
	'verifyOTP',
	async ({ otp, token }: Props, { rejectWithValue }) => {
		try {
			const { data } = await API.post(`/users/2fa/${token}`, { otp });
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);
const initialOTPState: OTPState = {
	isLoading: false,
	isAuthenticated: false,
	error: null,
	message: null,
};

const OTPSlice = createSlice({
	name: 'verifyOTP',
	initialState: initialOTPState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(verifyOTP.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			verifyOTP.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.message = action.payload.message;
				state.isAuthenticated = true;
				state.error = null;
			},
		);
		builder.addCase(verifyOTP.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.error = action.payload?.data?.message;
		});
	},
});

export const otpReducer = OTPSlice.reducer;
