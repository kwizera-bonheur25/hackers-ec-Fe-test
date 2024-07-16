import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserRedirection from '../../src/pages/userRedirection';

vi.mock('react-router-dom', async () => {
	const actual = await vi.importActual('react-router-dom');
	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});
interface UserRedirectionInputProps {
	text: string;
	otherStyles?: string;
}

vi.mock('../../src/components/redirections/UserRedirectionInput', () => ({
	default: ({ text }: UserRedirectionInputProps) => (
		<div data-testid="user-redirection-input">{text}</div>
	),
}));

const mockStore = configureStore([]);

describe('Success page redirection', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let store: any;

	beforeEach(() => {
		store = mockStore({
			forgotPassword: {
				isResetPassword: true,
			},
		});
	});

	it('should renders the component when isResetPassword is true', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<UserRedirection />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByText('Password Reset Email Sent')).toBeInTheDocument();
		expect(
			screen.getByText(
				/Please check your inbox for instructions to reset your password./,
			),
		).toBeInTheDocument();
		expect(
			screen.getByText(/If you can’t find the email, check your spam folder./),
		).toBeInTheDocument();
	});

	it('should not render the component when isResetPassword is false', () => {
		store = mockStore({
			forgotPassword: {
				isResetPassword: false,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<UserRedirection />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.queryByText('Email Sent')).not.toBeInTheDocument();
	});
});
