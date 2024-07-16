import { render, screen } from '@testing-library/react';
import AllProvider from '../../src/AllProvider';
import DashboardTopNav from '../../src/components/DashboardTopNav';

describe('Dah sidebar components', () => {
	it('render the correct content', () => {
		render(
			<AllProvider>
				<DashboardTopNav />
			</AllProvider>,
		);

		expect(screen.getByText('Hello!'));
	});
});
