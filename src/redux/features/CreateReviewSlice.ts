/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface reviewType {
	productId: string;
	feedBack: string;
	ratings: number;
}

const initialState: DynamicData = {
	isLoading: false,
	data: [],
	error: null,
};

export const createReview = createAsyncThunk(
	'createReview',
	async ({ productId, feedBack, ratings }: reviewType, { rejectWithValue }) => {
		try {
			const { data } = await API.post('/reviews', {
				productId,
				feedBack,
				ratings,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const createReviewSlice = createSlice({
	name: 'createReview',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createReview.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			createReview.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			createReview.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default createReviewSlice.reducer;
