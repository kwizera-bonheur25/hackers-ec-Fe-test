import { render, screen } from '@testing-library/react';
import DashboardSideNav from '../../src/components/DashboardSideNav';

test('renders DashboardSideNav component', () => {
	const role = 'Admin';
	const otherStyles = 'custom-styles';

	render(
		<DashboardSideNav role={role} otherStyles={otherStyles}>
			<div>Side bar</div>
		</DashboardSideNav>,
	);

	const websiteNameElement = screen.getByText('ShopTrove');
	expect(websiteNameElement).toBeInTheDocument();
});
