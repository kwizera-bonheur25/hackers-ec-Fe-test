import { render, screen } from '@testing-library/react';
import AdminProducts from '../../../../src/components/Layouts/AdminProducts';

describe('group', () => {
	it('should', () => {
		render(<AdminProducts />);

		expect(screen.getByText("Admin's Products")).toBeInTheDocument();
	});
});
