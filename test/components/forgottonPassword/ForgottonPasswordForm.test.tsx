import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ForgotPasswordForm from '../../../src/components/forgottonPassword/ForgottonPasswordForm';
import { store } from '../../../src/redux/store';

describe('Forgotten Password Form component', () => {
	it('should render a forgotten password form', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<ForgotPasswordForm />
				</BrowserRouter>
			</Provider>,
		);

		const emailInput = screen.getByPlaceholderText('Enter your email here');
		const continueButton = screen.getByText('Continue');
		const returnButton = screen.getByText('Return to site');

		expect(emailInput).toBeInTheDocument();
		expect(continueButton).toBeInTheDocument();
		expect(returnButton).toBeInTheDocument();
	});
});
