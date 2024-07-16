import { render, screen } from '@testing-library/react';
import AllProvider from '../Utils/AllProvider';
import ErrorPage from '../../src/pages/ErrorPage';

describe('Error Page', () => {
	it('should render the error page', () => {
		render(
			<AllProvider>
				<ErrorPage />
			</AllProvider>,
		);

		expect(screen.getByText(/Go to Home/i)).toBeInTheDocument();
	});

	it('should render error page with correct message', () => {
		render(<ErrorPage />, { wrapper: AllProvider });

		expect(screen.getByText(/wrong/i)).toBeInTheDocument();
	});
});
