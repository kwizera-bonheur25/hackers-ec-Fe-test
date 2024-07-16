/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import { RegisterSchemaType } from '../../validations/auth/Register.validation';
import API from '../../utils/api';

export const registera = createAsyncThunk(
	'register',

	async (registerData: RegisterSchemaType, { rejectWithValue }) => {
		try {
			const { data } = await API.post('/users/register', registerData);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);
const initialState: DynamicData = {
	isLoading: false,
	error: null,
};

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registera.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(registera.fulfilled, (state) => {
			state.isLoading = false;
			state.error = null;
		});
		builder.addCase(registera.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.isAuthenticated = false;
			state.error = action.payload?.data?.message;
		});
	},
});

export default registerSlice.reducer;
