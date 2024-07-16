import { render, screen } from '@testing-library/react';
import AdminDashboard from '../../../src/pages/Admin/Dashboard';

describe('Admin dashboard page', () => {
	it('should render admin page', () => {
		render(<AdminDashboard />);

		expect(screen.getByText('Admin dashboard')).toBeInTheDocument();
	});
});
