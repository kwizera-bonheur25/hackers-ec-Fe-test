import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ResetPasswordForm from '../../../src/components/ResetPassword/ResetPasswordForm';
import { store } from '../../../src/redux/store';

describe('Reset Password Form component', () => {
	it('should render a reset password form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<ResetPasswordForm />
				</BrowserRouter>
			</Provider>,
		);

		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput =
			screen.getByPlaceholderText('Confirm Password');
		const confirmButton = screen.getByText('Confirm');
		const returnButton = screen.getByText('Return to site');

		expect(passwordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
		expect(confirmButton).toBeInTheDocument();
		expect(returnButton).toBeInTheDocument();
	});
});
