import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../../src/redux/store';
import Register from '../../../src/pages/auth/Register';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../../../src/components/auth/RegisterForm';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`;

const mockUseHandleResize = vi.fn();

vi.mock('../../hooks/useHandleResize', () => ({
	useHandleResize: () => mockUseHandleResize(),
}));

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
	it('should not display "Already have an account" section when show is true', () => {
		mockUseHandleResize.mockReturnValue({ show: true });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<RegisterForm />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);
		expect(
			screen.queryByText(/Already have an account/i),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /LOGIN/i }),
		).not.toBeInTheDocument();
	});
	it('should  display "Already have an account" section when show is false', () => {
		mockUseHandleResize.mockReturnValue({ show: false });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<GoogleOAuthProvider clientId={clientId}>
						<RegisterForm />
					</GoogleOAuthProvider>
				</BrowserRouter>
			</Provider>,
		);
		expect(
			screen.queryByText(/Already have an account/i),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /LOGIN/i }),
		).not.toBeInTheDocument();
	});
});
