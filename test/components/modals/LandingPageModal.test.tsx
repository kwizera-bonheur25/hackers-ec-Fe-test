import { render, screen } from '@testing-library/react';
import LandingPageModel from '../../../src/components/LandingPageModel';
import AllProvider from '../../Utils/AllProvider';
import userEvent from '@testing-library/user-event';

describe('Open landing page modal', () => {
	it('should open model', async () => {
		render(
			<AllProvider>
				<LandingPageModel
					openModel={true}
					toggleModel={() => console.log('Test')}
				/>
			</AllProvider>,
		);

		const searchInput = screen.getByPlaceholderText('Search ...');
		const user = userEvent.setup();
		await user.type(searchInput, 'product');
		expect(searchInput).toBeInTheDocument();

		const navLinks = ['Home', 'Products', 'About', 'Contacts'];
		navLinks.forEach((linkText) => {
			const link = screen.getByText(linkText);
			expect(link).toBeInTheDocument();
		});
		expect(searchInput).toHaveValue('product');
		expect(searchInput).toBeInTheDocument();
	});
});
