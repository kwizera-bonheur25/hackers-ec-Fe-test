/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

const initialState: DynamicData = {
	isLoading: false,
	data: [],
	error: null,
};

export const fetchReview = createAsyncThunk(
	'fetchReview',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`products/${id}/reviews`);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const fetchReviewSlice = createSlice({
	name: 'fetchReview',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchReview.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			fetchReview.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			fetchReview.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default fetchReviewSlice.reducer;
