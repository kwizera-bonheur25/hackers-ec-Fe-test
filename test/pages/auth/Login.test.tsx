import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Login from '../../../src/pages/auth/Login';
import { store } from '../../../src/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

describe('Login component', () => {
	it('updates email and password inputs correctly', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<Login />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);

		const emailInput = screen.getByPlaceholderText(/email/i);
		const passwordInput = screen.getByPlaceholderText(/password/i);

		fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });

		expect(emailInput).toHaveValue('email@example.com');
		expect(passwordInput).toHaveValue('password123');
	});
});
