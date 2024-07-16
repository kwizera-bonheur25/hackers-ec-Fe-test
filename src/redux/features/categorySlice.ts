/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';
import { CategoryState } from '../../@types/Category';

export const fetchCategories = createAsyncThunk(
	'fetch/allCategories',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/categories');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialState: CategoryState = {
	isLoading: false,
	categories: [],
	error: null,
};

const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchCategories.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.categories = action.payload.data;
				state.isLoading = false;
			},
		);
		builder.addCase(
			fetchCategories.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default categorySlice.reducer;
