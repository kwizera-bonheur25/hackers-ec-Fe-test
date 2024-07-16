// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SellerRedirection from '../../src/pages/SellerRedirection';

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

const mocktore = configureStore([]);

describe('SellerRedirection', () => {
	let store: any;

	beforeEach(() => {
		store = mocktore({
			login: {
				requires2FA: true,
			},
		});
	});

	it('renders the component when requires2FA is true', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SellerRedirection />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByText('Email Sent')).toBeInTheDocument();
		expect(screen.getByText(/Email sent for verification/)).toBeInTheDocument();
		expect(screen.getByText(/If you don't see the email/)).toBeInTheDocument();
	});

	it('does not render the component when requires2FA is false', () => {
		store = mocktore({
			login: {
				requires2FA: false,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<SellerRedirection />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.queryByText('Email Sent')).not.toBeInTheDocument();
	});
});
