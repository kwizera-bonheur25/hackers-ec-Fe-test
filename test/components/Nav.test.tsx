import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DynamicData } from '../../src/@types/DynamicData';
import Nav from '../../src/components/Nav';
import cartReducer from '../../src/redux/features/cartSlice';
import navReducer from '../../src/redux/features/navSlice';
import notificationReducer from '../../src/redux/features/notificationSlice';
import profileReducer from '../../src/redux/features/userUpdateSlice';
import { localStorageMock } from '../mock/localStorage';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

const renderWithProviders = (
	ui: React.ReactElement,
	{ preloadedState = {} } = {},
) => {
	const store = configureStore({
		reducer: {
			nav: navReducer,
			cart: cartReducer,
			profile: profileReducer,
			notifications: notificationReducer,
		},
		preloadedState,
	});

	return render(
		<Provider store={store}>
			<BrowserRouter>{ui}</BrowserRouter>
		</Provider>,
	);
};

describe('Nav Component', () => {
	const renderComponent = (preloadedState = {}) => {
		renderWithProviders(<Nav />, { preloadedState });
	};

	it('renders the Home link', () => {
		renderComponent();

		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('renders the About link', () => {
		renderComponent();
		expect(screen.getByText('About Us')).toBeInTheDocument();
	});

	it('should show the notification bell and profile image', () => {
		const mockToken = 'valid-token';
		localStorage.setItem('access_token', mockToken);
		const mockDecoded = { id: 1, role: 'BUYER' };

		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);
		renderComponent();

		expect(screen.getByLabelText('bell-image')).toBeInTheDocument();
	});

	it('It should render the search input', async () => {
		renderComponent();
		const searchField = screen.getByPlaceholderText(/search/i);
		const user = userEvent.setup();
		await user.type(searchField, 'product');
		expect(searchField).toHaveValue('product');
		expect(searchField).toBeInTheDocument();
	});
	it('should render the span with numberOfItem when numberOfItem > 0', () => {
		const preloadedState = {
			cart: {
				numberOfItem: 5,
				carts: [],
			},
			nav: { openModel: false },
			profile: { data: null },
		};
		renderComponent(preloadedState);

		const itemCountSpan = screen.getByTestId('number-of-item');
		expect(itemCountSpan).toBeInTheDocument();
		expect(itemCountSpan).toHaveTextContent('5');
	});

	it('should not render the span when numberOfItem is 0', () => {
		const preloadedState = {
			cart: {
				numberOfItem: 0,
				carts: [],
			},
			nav: { openModel: false },
			profile: { data: null },
		};
		renderComponent(preloadedState);

		const itemCountSpan = screen.queryByTestId('number-of-item');
		expect(itemCountSpan).toBeNull();
	});
});
