/* eslint-disable @typescript-eslint/no-var-requires */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { vi } from 'vitest';
import HandleGoogleLogin from '../../../src/components/HandleGoogleLogin';
import useToast from '../../../src/hooks/useToast';
import useToken from '../../../src/hooks/useToken';

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
	useSearchParams: vi.fn(),
}));

vi.mock('../../../src/hooks/useToken', () => ({
	__esModule: true,
	default: vi.fn(),
}));

vi.mock('../../../src/hooks/useToast', () => ({
	__esModule: true,
	default: vi.fn(),
}));

const mockStore = configureStore([]);

describe('HandleGoogleLogin', () => {
	it('should handle valid token', () => {
		const mockNavigate = vi.fn();
		const mockSaveAccessToken = vi.fn();
		const mockShowSuccessMessage = vi.fn();
		const mockShowErrorMessage = vi.fn();

		(useSearchParams as any).mockReturnValue([
			new URLSearchParams({ token: 'valid_token', message: 'Success' }),
		]);
		(useToken as any).mockReturnValue({ saveAccessToken: mockSaveAccessToken });
		(useToast as any).mockReturnValue({
			showSuccessMessage: mockShowSuccessMessage,
			showErrorMessage: mockShowErrorMessage,
		});
		(useNavigate as any).mockReturnValue(mockNavigate);

		const store = mockStore({
			google: {
				isAuthenticated: false,
				token: null,
				message: null,
				error: null,
			},
		});

		render(
			<Provider store={store}>
				<HandleGoogleLogin />
			</Provider>,
		);

		expect(mockSaveAccessToken).toHaveBeenCalledWith('valid_token');
		expect(mockShowSuccessMessage).toHaveBeenCalledWith('Success');
		expect(mockNavigate).toHaveBeenCalledWith('/');
	});

	it('should handle missing token', () => {
		const mockNavigate = vi.fn();
		const mockShowErrorMessage = vi.fn();

		(useSearchParams as any).mockReturnValue([new URLSearchParams('')]);
		(useToken as any).mockReturnValue({ saveAccessToken: vi.fn() });
		(useToast as any).mockReturnValue({
			showSuccessMessage: vi.fn(),
			showErrorMessage: mockShowErrorMessage,
		});
		(useNavigate as any).mockReturnValue(mockNavigate);

		const store = mockStore({
			google: {
				isAuthenticated: false,
				token: null,
				message: null,
				error: null,
			},
		});

		render(
			<Provider store={store}>
				<HandleGoogleLogin />
			</Provider>,
		);

		expect(mockShowErrorMessage).toHaveBeenCalledWith(
			'Please login to continue',
		);
		expect(mockNavigate).toHaveBeenCalledWith('/login');
	});
});
