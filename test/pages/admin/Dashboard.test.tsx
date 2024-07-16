import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Dashboard from '../../../src/pages/Admin/Dashboard';

describe('Dashboard page', () => {
	it('should render dashboard page', () => {
		render(<Dashboard />);
		expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
	});
});
