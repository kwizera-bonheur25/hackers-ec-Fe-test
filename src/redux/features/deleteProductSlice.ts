/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import { ProductDeleteState } from '../../@types/product';
import API from '../../utils/api';

const initialState: ProductDeleteState = {
	isLoading: false,
	products: [],
	error: null,
	singleProduct: [],
};

export const deleteProduct = createAsyncThunk(
	'deleteProduct',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await API.delete(`/products/${id}`);
			return { id, message: data.message };
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			deleteProduct.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
		builder.addCase(deleteProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(deleteProduct.fulfilled, (state, action) => {
			state.isLoading = false;
			state.products = state.products.filter(
				(product) => product.id !== action.payload.id,
			);
		});
	},
});

export default productsSlice.reducer;
