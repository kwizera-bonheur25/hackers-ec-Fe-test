import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import ProductPageAddToCart from '../../../src/components/carts/ProductPageAddToCart';
import cartReducer from '../../../src/redux/features/cartSlice';
import productReducer from '../../../src/redux/features/productSlice';

vi.mock('../../../src/hooks/useToast', () => ({
	__esModule: true,
	default: () => ({
		showSuccessMessage: vi.fn(),
		showErrorMessage: vi.fn(),
	}),
}));

const renderWithProviders = (ui: any, { preloadedState = {} } = {}) => {
	const store = configureStore({
		reducer: {
			cart: cartReducer,
			products: productReducer,
		},
		preloadedState,
	});

	return render(<Provider store={store}>{ui}</Provider>);
};

describe('ProductPageAddToCart', () => {
	const productId = '1';
	const preloadedState = {
		cart: {
			carts: { products: [] },
			numberOfItem: 0,
		},

		product: {
			isLoading: false,
			products: [],
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render the add to cart button with initial background color', () => {
		renderWithProviders(<ProductPageAddToCart productId={productId} />, {
			preloadedState,
		});

		const addToCartButton = screen.getByTestId(`add-to-cart-${productId}`);
		expect(addToCartButton).toHaveClass('bg-primary-lightblue');
	});

	it('should add a product to the cart and change the button background color on click', async () => {
		renderWithProviders(<ProductPageAddToCart productId={productId} />, {
			preloadedState,
		});

		const addToCartButton = screen.getByTestId(`add-to-cart-${productId}`);
		expect(addToCartButton).toHaveClass('bg-primary-lightblue');

		userEvent.click(addToCartButton);

		expect(addToCartButton).toHaveClass(
			'cart_icon cart_btn absolute right-3 bottom-3 text-neutral-white p-2 text-2xl rounded-full flex items-center justify-center bg-primary-lightblue cursor-pointer pointer-events-auto',
		);
	});
});
