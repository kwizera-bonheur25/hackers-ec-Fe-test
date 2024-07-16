import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import LoginForm from '../../../src/components/auth/LoginForm';
import { store } from '../../../src/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

describe('LoginForm component', () => {
	it('should render a login form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<LoginForm />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);

		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const loginButton = screen.getByText('Login');

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
	});
});
