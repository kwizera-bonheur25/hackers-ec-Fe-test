import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UpdatePassword from '../../../src/components/Layouts/UpdatePassword';
import AllProvider from '../../Utils/AllProvider';

describe('user password update component', () => {
	it('handles successful password update', async () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const [newPasswordInput, confirmPasswordInput] =
			screen.getAllByPlaceholderText('***********.');

		fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
		fireEvent.change(confirmPasswordInput, {
			target: { value: 'newPassword' },
		});

		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
	});

	it('handles failed password update', async () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const [newPasswordInput, confirmPasswordInput] =
			screen.getAllByPlaceholderText('***********.');

		fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
		fireEvent.change(confirmPasswordInput, {
			target: { value: 'newPassword' },
		});

		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
	});

	it('handles error during password update', async () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const [newPasswordInput, confirmPasswordInput] =
			screen.getAllByPlaceholderText('***********.');

		fireEvent.change(newPasswordInput, { target: { value: 'newPassword' } });
		fireEvent.change(confirmPasswordInput, {
			target: { value: 'newPassword' },
		});

		fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
	});

	it('renders the update form', () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const oldPasswordInput = screen.getByLabelText(
			'Old Password:',
		) as HTMLInputElement;
		const newPasswordInput = screen.getByLabelText(
			'New Password:',
		) as HTMLInputElement;
		const confirmPasswordInput = screen.getByLabelText(
			'Confirm Password:',
		) as HTMLInputElement;

		expect(oldPasswordInput).toBeInTheDocument();
		expect(newPasswordInput).toBeInTheDocument();
		expect(confirmPasswordInput).toBeInTheDocument();
	});

	it('displays validation errors when form is submitted with empty fields', async () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const submitButton = screen.getByText('Submit');
		fireEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getAllByText("Password field can't be empty")).toHaveLength(
				3,
			);
		});
	});

	it('renders BackButton with correct props', () => {
		render(<UpdatePassword />, { wrapper: AllProvider });

		const backButton = screen.getByText('Back');
		expect(backButton).toBeInTheDocument();
	});
});
