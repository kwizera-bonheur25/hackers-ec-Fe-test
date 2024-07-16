/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';

interface cartDataToSend {
	productId: string;
	quantity: number;
}

interface CartState {
	isLoading: boolean;
	isInitialLoading: boolean;
	carts: DynamicData;
	numberOfItem: number;
	error: string | null;
}

const initialState: CartState = {
	isLoading: false,
	isInitialLoading: false,
	carts: [],
	numberOfItem: 0,
	error: null,
};

const sortProducts = (products: DynamicData) => {
	if (!Array.isArray(products)) return [];
	return products.sort((a, b) => a.id.localeCompare(b.id));
};

export const getCarts = createAsyncThunk(
	'getCarts',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/carts');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const removeCarts = createAsyncThunk(
	'removeCart',
	async (productId: string, { rejectWithValue }) => {
		try {
			const { data } = await API.patch('/carts', { productId });
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

export const cartQuantities = createAsyncThunk(
	'cartQuantity',
	async ({ productId, quantity }: cartDataToSend, { rejectWithValue }) => {
		try {
			await API.post('/carts', { productId, quantity });
			const updatedCartData = await API.get('/carts');
			return updatedCartData.data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const cartsSlice = createSlice({
	name: 'carts',
	initialState,

	reducers: {},
	extraReducers: (builder) => {
		// ************* get carts ***************************
		builder.addCase(getCarts.pending, (state) => {
			state.isInitialLoading = true;
			state.error = null;
		});
		builder.addCase(
			getCarts.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isInitialLoading = false;
				state.carts = action.payload.data;
				state.carts.products = sortProducts(state.carts?.products);
				state.numberOfItem = action.payload.data.products.length;
			},
		);
		builder.addCase(getCarts.rejected, (state, action: PayloadAction<any>) => {
			state.isInitialLoading = false;
			state.error = action.payload;
		});
		// ************* remove cart ***************************
		builder.addCase(removeCarts.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});

		builder.addCase(
			removeCarts.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.isLoading = false;
				state.carts = action.payload.data;
				state.carts.products = sortProducts(state.carts?.products);
				state.numberOfItem = action.payload.data.products.length;
			},
		);

		builder.addCase(
			removeCarts.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload;
			},
		);
		// ***** increment and decrement quantity in cart ***************************
		builder.addCase(cartQuantities.pending, (state) => {
			state.error = null;
		});
		builder.addCase(
			cartQuantities.fulfilled,
			(state, action: PayloadAction<DynamicData>) => {
				state.carts = action.payload.data;
				state.carts.products = sortProducts(state.carts?.products);
				state.numberOfItem = action.payload.data.products.length;
			},
		);
		builder.addCase(
			cartQuantities.rejected,
			(state, action: PayloadAction<any>) => {
				state.error = action.payload;
			},
		);
	},
});

export const isProductInCart = (
	state: { cart: CartState },
	productId: string,
) =>
	state.cart.carts.products?.some(
		(product: DynamicData) => product.id === productId,
	);

export default cartsSlice.reducer;
