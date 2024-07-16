import { render, screen } from '@testing-library/react';
import Roles from '../../../../src/pages/Admin/Roles';

describe('Roles page', () => {
	it('should render roles', () => {
		render(<Roles />);

		expect(screen.getByText(/Roles/i)).toBeInTheDocument();
	});
});
