/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import { ProductState } from '../../@types/product';
import API from '../../utils/api';
import { productTypes } from '../../validations/products/addProductValidation';

const initialState: ProductState = {
	isLoading: false,
	products: [],
	error: null,
	singleProduct: [],
};

export const addProduct = createAsyncThunk(
	'addProduct',
	async (productData: productTypes, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			Object.keys(productData).forEach((key) => {
				if (key === 'images' && productData.images) {
					productData.images.forEach((image) =>
						formData.append('images', image),
					);
				} else {
					formData.append(
						key,
						productData[key as keyof productTypes] as string,
					);
				}
			});
			const { data } = await API.post('/products', formData);
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const getProducts = createAsyncThunk(
	'products',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/products');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const getSinleProducts = createAsyncThunk(
	'singleProduct',
	async (id: string, { rejectWithValue }) => {
		try {
			const { data } = await API.get(`/products/${id}`);
			return data.data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const updateProduct = createAsyncThunk(
	'updateProduct',
	async (
		{ id, productData }: { id: string; productData: productTypes },
		{ rejectWithValue },
	) => {
		try {
			const formData = new FormData();
			Object.keys(productData).forEach((key) => {
				if (key === 'images' && productData.images) {
					productData.images.forEach((image) =>
						formData.append('images', image),
					);
				} else {
					formData.append(
						key,
						productData[key as keyof productTypes] as string,
					);
				}
			});

			const res = await API.patch(`/products/${id}`, formData);
			return res.data;
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
		builder.addCase(addProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(
			addProduct.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.products = [...state.products, action.payload.data];
				state.isLoading = false;
				state.error = null;
			},
		);
		builder.addCase(
			addProduct.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);

		builder.addCase(getProducts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getProducts.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.products = action.payload.data;
			},
		);
		builder.addCase(
			getProducts.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);

		builder.addCase(getSinleProducts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			getSinleProducts.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.singleProduct = [action.payload];
			},
		);
		builder.addCase(
			getSinleProducts.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);

		builder.addCase(updateProduct.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(
			updateProduct.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.products = state.singleProduct.map((product: { id: string }) =>
					product.id === action.payload.data.id ? action.payload.data : product,
				);
				state.isLoading = false;
				state.error = null;
			},
		);

		builder.addCase(
			updateProduct.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});

export default productsSlice.reducer;
