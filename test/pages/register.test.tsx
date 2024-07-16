import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Register from '../../src/pages/auth/Register';
import { store } from '../../src/redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

describe('Register component', () => {
	it('render the register form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<Register />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);
		const usernameInput = screen.getByPlaceholderText('User name');
		const fnameInput = screen.getByPlaceholderText('First name');
		const lnameInput = screen.getByPlaceholderText('Last name');
		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmInput = screen.getByPlaceholderText('Confirm password');
		const registerButton = screen.getByText(/Register/i);

		expect(usernameInput).toBeInTheDocument();
		expect(fnameInput).toBeInTheDocument();
		expect(lnameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(confirmInput).toBeInTheDocument();
		expect(registerButton).toBeInTheDocument();
	});

	it('updates fields inputs correctly', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<Register />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);

		const usernameInput = screen.getByPlaceholderText('User name');
		const fnameInput = screen.getByPlaceholderText('First name');
		const lnameInput = screen.getByPlaceholderText('Last name');
		const emailInput = screen.getByPlaceholderText('Email');
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmInput = screen.getByPlaceholderText('Confirm password');

		fireEvent.change(usernameInput, { target: { value: 'user' } });
		fireEvent.change(fnameInput, { target: { value: 'Kante' } });
		fireEvent.change(lnameInput, { target: { value: 'Ngolo' } });
		fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
		fireEvent.change(passwordInput, { target: { value: 'password123' } });
		fireEvent.change(confirmInput, { target: { value: 'password123' } });

		expect(usernameInput).toHaveValue('user');
		expect(fnameInput).toHaveValue('Kante');
		expect(lnameInput).toHaveValue('Ngolo');
		expect(emailInput).toHaveValue('email@example.com');
		expect(passwordInput).toHaveValue('password123');
		expect(confirmInput).toHaveValue('password123');
	});
});
