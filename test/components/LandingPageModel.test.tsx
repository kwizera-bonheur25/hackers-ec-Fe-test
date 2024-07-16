import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LandingPageModel from '../../src/components/LandingPageModel';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../src/redux/store';

describe('LandingPageModel Component', () => {
	it('renders search input', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LandingPageModel openModel={true} toggleModel={() => {}} />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByPlaceholderText('Search ...')).toBeInTheDocument();
	});

	it('renders navigation links', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LandingPageModel openModel={true} toggleModel={() => {}} />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByText('Home')).toBeInTheDocument();
		expect(screen.getByText('Products')).toBeInTheDocument();
		expect(screen.getByText('About')).toBeInTheDocument();
		expect(screen.getByText('Contacts')).toBeInTheDocument();
	});
});
