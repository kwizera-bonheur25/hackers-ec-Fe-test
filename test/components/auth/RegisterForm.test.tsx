import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { store } from '../../../src/redux/store';
import RegisterForm from '../../../src/components/auth/RegisterForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

describe('LoginForm component', () => {
	it('should render a login form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<RegisterForm />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);

		const usernameInput = screen.getByPlaceholderText('User name');
		const fnmaeInput = screen.getByPlaceholderText('First name');
		const lnmaeInput = screen.getByPlaceholderText('Last name');
		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput =
			screen.getByPlaceholderText('Confirm password');
		const loginButton = screen.getByText('Register');

		expect(usernameInput).toBeInTheDocument();
		expect(fnmaeInput).toBeInTheDocument();
		expect(lnmaeInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});
});
