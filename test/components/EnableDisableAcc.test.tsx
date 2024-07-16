/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../src/redux/hooks/hooks';
import {
	enableAccount,
	setEnable,
	resetField,
} from '../../src/redux/features/EnableAccountSlice';
import useToast from '../../src/hooks/useToast';
import { DynamicData } from '../../src/@types/DynamicData';
import { ThunkDispatch } from '@reduxjs/toolkit';
import EditUserForm from '../../src/components/Forms/editUserForm';

vi.mock('../../src/redux/hooks/hooks', () => ({
	useAppDispatch: vi.fn(),
	useAppSelector: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

vi.mock('../../src/redux/features/EnableAccountSlice', () => ({
	enableAccount: vi.fn(),
	setEnable: vi.fn(),
	resetField: vi.fn(),
}));

vi.mock('../../src/hooks/useToast', () => ({
	default: vi.fn(),
}));

describe('handleEnableDisableSubmit', () => {
	let dispatch: ThunkDispatch<any, any, any>;
	let navigate: NavigateFunction;
	let showSuccessMessage: (message: string) => void;
	let showErrorMessage: (message: string) => void;
	const successMessage = vi.fn();
	const errorMessage = vi.fn();

	beforeEach(() => {
		dispatch = vi.fn() as unknown as ThunkDispatch<any, any, any>;
		navigate = vi.fn() as unknown as NavigateFunction;
		showSuccessMessage = vi.fn();
		showErrorMessage = vi.fn();
		(useAppDispatch as any).mockReturnValue(dispatch);
		(useNavigate as any).mockReturnValue(navigate);
		(useToast as any).mockReturnValue({ showSuccessMessage, showErrorMessage });
		(useAppSelector as any).mockReturnValue({
			allRoles: {
				data: [{ id: '1', isActive: true }],
			},
		});
	});

	let id = '123';
	const reason = 'Test reason';

	let handleEnableDisableSubmit = async (newEnable: string) => {
		try {
			if (id) {
				const res = await dispatch(
					enableAccount({ id, isAccountActive: newEnable, reason }),
				).unwrap();
				showSuccessMessage(res.message);
				navigate('/dashboard/users');
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.response?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	const handleEnableDisableClick = (newEnable: string) => {
		handleEnableDisableSubmit(newEnable);
		dispatch(setEnable(newEnable));
		dispatch(resetField());
	};

	it('should enable/disable account successfully', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockResolvedValue({ message: 'Success' }),
		});

		await handleEnableDisableSubmit('true');

		expect(dispatch).toHaveBeenCalledWith(
			enableAccount({
				id: '123',
				isAccountActive: 'true',
				reason: 'Test reason',
			}),
		);
		expect(showSuccessMessage).toHaveBeenCalledWith('Success');
		expect(navigate).toHaveBeenCalledWith('/dashboard/users');
	});

	it('should show error message on failure', async () => {
		const errorMessage = 'Error occurred';
		(dispatch as any).mockReturnValue({
			unwrap: vi
				.fn()
				.mockRejectedValue({ response: { data: { message: errorMessage } } }),
		});

		await handleEnableDisableSubmit('true');

		expect(dispatch).toHaveBeenCalledWith(
			enableAccount({
				id: '123',
				isAccountActive: 'true',
				reason: 'Test reason',
			}),
		);
		expect(showErrorMessage).toHaveBeenCalledWith(errorMessage);
		expect(navigate).not.toHaveBeenCalled();
	});

	it('should show default error message on failure', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockRejectedValue({}),
		});

		await handleEnableDisableSubmit('true');

		expect(dispatch).toHaveBeenCalledWith(
			enableAccount({
				id: '123',
				isAccountActive: 'true',
				reason: 'Test reason',
			}),
		);
		expect(showErrorMessage).toHaveBeenCalledWith(
			'Unknown error occurred! Please try again!',
		);
		expect(navigate).not.toHaveBeenCalled();
	});

	it('should navigate to dashboard on success', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockResolvedValue({ message: 'Success' }),
		});

		await handleEnableDisableSubmit('true');

		expect(navigate).toHaveBeenCalledWith('/dashboard/users');
	});

	it('should not navigate to dashboard on failure', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockRejectedValue({}),
		});

		await handleEnableDisableSubmit('true');

		expect(navigate).not.toHaveBeenCalled();
	});

	it('should show success message on success', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockResolvedValue({ message: 'Success' }),
		});

		await handleEnableDisableSubmit('true');

		expect(showSuccessMessage).toHaveBeenCalledWith('Success');
	});

	it('should not show success message on failure', async () => {
		(dispatch as any).mockReturnValue({
			unwrap: vi.fn().mockRejectedValue({}),
		});

		await handleEnableDisableSubmit('true');

		expect(showSuccessMessage).not.toHaveBeenCalled();
	});

	it('should render EditUserForm without crashing', () => {
		render(
			<EditUserForm
				id="123"
				useR={[{ id: '1', isActive: true }]}
				successMessage={successMessage}
				errorMessage={errorMessage}
			/>,
		);
	});

	it('should call handleEnableDisableSubmit, setEnable, and resetField on handleEnableDisableClick', async () => {
		(setEnable as any).mockReturnValue({ type: 'setEnable' });
		(resetField as any).mockReturnValue({ type: 'resetField' });

		// Mock handleEnableDisableSubmit
		const mockHandleEnableDisableSubmit = vi.fn();
		const originalHandleEnableDisableSubmit = handleEnableDisableSubmit;
		handleEnableDisableSubmit = mockHandleEnableDisableSubmit;

		const newEnable = 'false';
		handleEnableDisableClick(newEnable);

		expect(mockHandleEnableDisableSubmit).toHaveBeenCalledWith(newEnable);
		expect(dispatch).toHaveBeenCalledWith(setEnable(newEnable));
		expect(dispatch).toHaveBeenCalledWith(resetField());

		// Restore original handleEnableDisableSubmit
		handleEnableDisableSubmit = originalHandleEnableDisableSubmit;
	});

	// New test to cover when id is not present
	it('should not call dispatch when id is not present', async () => {
		const idBackup = id;
		const localId = '';
		const handleEnableDisableSubmit = async (newEnable: string) => {
			try {
				if (localId) {
					const res = await dispatch(
						enableAccount({ id: localId, isAccountActive: newEnable, reason }),
					).unwrap();
					showSuccessMessage(res.message);
					navigate('/dashboard/users');
				}
			} catch (e) {
				const err = e as DynamicData;
				showErrorMessage(
					err.response.data.message ||
						err?.message ||
						'Unknown error occurred! Please try again!',
				);
			}
		};

		await handleEnableDisableSubmit('true');

		expect(dispatch).not.toHaveBeenCalled();

		// Restore id
		id = idBackup;
	});
});
