/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface EditreviewType {
	reviewId: string;
	feedBack: string;
	ratings: number;
}
const initialState: DynamicData = {
	isLoading: false,
	data: [],
	error: null,
};
export const editReview = createAsyncThunk(
	'editReview',
	async (
		{ reviewId, feedBack, ratings }: EditreviewType,
		{ rejectWithValue },
	) => {
		try {
			const { data } = await API.patch(`/reviews/${reviewId}`, {
				feedBack,
				ratings,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const editReviewSlice = createSlice({
	name: 'editReview',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(editReview.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			editReview.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			editReview.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default editReviewSlice.reducer;
