/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';
import { searchInputs, searchState } from '../../@types/SearchType';

export const search = createAsyncThunk(
	'search',
	async (searchInputs: searchInputs, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/products/search', {
				params: searchInputs,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);
const initialState: searchState = {
	isLoading: false,
	error: null,
	searchInputs: {
		name: null,
		minPrice: null,
		maxPrice: null,
		categoryName: null,
	},
	data: [],
};
const SearchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		manipulateSearchInput: (state, action: PayloadAction<searchInputs>) => {
			state.searchInputs = { ...state.searchInputs, ...action.payload };
		},
		getSearchedProducts: (state, action: PayloadAction<any>) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(search.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(
			search.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.data = action.payload.product;
				state.isLoading = false;
			},
		);
		builder.addCase(search.rejected, (state, action: PayloadAction<any>) => {
			(state.isLoading = false), (state.error = action.payload?.data?.message);
		});
	},
});

export const { getSearchedProducts, manipulateSearchInput } =
	SearchSlice.actions;
export default SearchSlice.reducer;
