/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface rolesState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
}

const initialState: rolesState = {
	data: [],
	isLoading: false,
	error: null,
};

export const getRoles = createAsyncThunk(
	'getRoles',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/roles');
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const getRolesSlice = createSlice({
	name: 'getRoles',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRoles.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getRoles.fulfilled, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.data = [...state.data, action.payload];
			state.error = null;
		});
		builder.addCase(getRoles.rejected, (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.error = action.payload?.data?.message;
		});
	},
});
export default getRolesSlice.reducer;
