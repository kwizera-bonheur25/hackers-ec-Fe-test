import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ForgotPassword from '../../../src/pages/forgottenPassword/ForgotPassword';
import AllProvider from '../../Utils/AllProvider';

describe('Forgot password component', () => {
	it('should render forgot password component without error', () => {
		render(<ForgotPassword />, { wrapper: AllProvider });
	});

	it('should updates email inputs correctly', () => {
		render(<ForgotPassword />, { wrapper: AllProvider });
		const emailInput = screen.getByPlaceholderText(/email/i);

		fireEvent.change(emailInput, { target: { value: 'email@example.com' } });

		expect(emailInput).toHaveValue('email@example.com');
	});
});
