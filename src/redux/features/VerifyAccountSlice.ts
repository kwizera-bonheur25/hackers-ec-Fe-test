/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import { VerifyState } from '../../@types/auth/VerifyAccountTypes';
import API from '../../utils/api';

export const verify = createAsyncThunk(
	'verify',
	async (token: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/users/account/verify/${token}`);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: VerifyState = {
	isLoading: false,
	isVerified: false,
	message: null,
};

const VerifyAccountSlice = createSlice({
	name: 'verify',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(verify.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(verify.fulfilled, (state, action: PayloadAction<any>) => {
			state.message = action.payload.message;
			state.isLoading = false;
			state.isVerified = true;
		});
		builder.addCase(verify.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.isVerified = false;
			state.message = action.payload?.data?.message;
		});
	},
});
export default VerifyAccountSlice.reducer;
