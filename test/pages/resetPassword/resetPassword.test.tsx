import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResetPassword from '../../../src/pages/resetPassword/resetPassword';
import AllProvider from '../../Utils/AllProvider';

describe('Reset password component', () => {
	it('updates password and confirm password inputs correctly', () => {
		render(<ResetPassword />, { wrapper: AllProvider });
		const passwordInput = screen.getByPlaceholderText('Password');
		const confirmPasswordInput =
			screen.getByPlaceholderText('Confirm Password');

		fireEvent.change(passwordInput, { target: { value: 'Hello@123!' } });
		fireEvent.change(confirmPasswordInput, { target: { value: 'Hello@123!' } });

		expect(passwordInput).toHaveValue('Hello@123!');
		expect(confirmPasswordInput).toHaveValue('Hello@123!');
	});
});
