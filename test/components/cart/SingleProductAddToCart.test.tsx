import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import SinglePageAddToCart from '../../../src/components/carts/SingleProductAddToCart';
import cartReducer from '../../../src/redux/features/cartSlice';

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
		},
		preloadedState,
	});

	return render(<Provider store={store}>{ui}</Provider>);
};

describe('SinglePageAddToCart', () => {
	const productId = '1';
	const preloadedState = {
		cart: {
			carts: { products: [{ id: productId, quantity: 1 }] },
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should render the quantity buttons and initial quantity', () => {
		renderWithProviders(<SinglePageAddToCart productId={productId} />, {
			preloadedState,
		});

		const quantityDisplay = screen.getByTestId('quantity-display');
		expect(quantityDisplay).toBeInTheDocument();
		expect(quantityDisplay.textContent).toBeDefined();

		const incrementButton = screen.getByTestId('increment-button');
		const decrementButton = screen.getByTestId('decrement-button');

		expect(incrementButton).toBeInTheDocument();
		expect(decrementButton).toBeInTheDocument();
	});

	it('should increment the quantity when the plus button is clicked', async () => {
		renderWithProviders(<SinglePageAddToCart productId={productId} />, {
			preloadedState,
		});

		const incrementButton = screen.getByTestId('increment-button');
		const quantityDisplay = screen.getByTestId('quantity-display');

		await userEvent.click(incrementButton);

		expect(quantityDisplay.textContent).toBe('2');
	});

	it('should decrement the quantity when the minus button is clicked', async () => {
		renderWithProviders(<SinglePageAddToCart productId={productId} />, {
			preloadedState,
		});

		const decrementButton = screen.getByTestId('decrement-button');
		const quantityDisplay = screen.getByTestId('quantity-display');

		await userEvent.click(decrementButton);

		expect(quantityDisplay.textContent).toBe('0');
	});
});
