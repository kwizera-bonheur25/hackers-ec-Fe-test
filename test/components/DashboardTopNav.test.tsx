import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import DashboardTopNav from '../../src/components/DashboardTopNav';
import AllProvider from '../Utils/AllProvider';

describe('Dashboard Top Nav component', () => {
	it('should render a component with hello word', () => {
		render(<DashboardTopNav />, { wrapper: AllProvider });
		const element = screen.getByRole('heading', { name: /hello/i });
		expect(element).toBeInTheDocument();
	});
});
