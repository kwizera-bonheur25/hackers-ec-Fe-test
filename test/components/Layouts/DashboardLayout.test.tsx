import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { it, expect, describe } from 'vitest';
import DashboardLayout from '../../../src/components/Layouts/DashboardLayout';
import AllProvider from '../../../src/AllProvider';
import { localStorageMock } from '../../mock/localStorage';
import { jwtDecode } from 'jwt-decode';
import { DynamicData } from '../../../src/@types/DynamicData';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('DashboardLayout component', () => {
	it('should render a component passed as an Outlet', () => {
		render(
			<AllProvider>
				<Routes>
					<Route path="/" element={<DashboardLayout />}>
						<Route index element={<div>Hello seller</div>} />
					</Route>
				</Routes>
			</AllProvider>,
		);

		expect(screen.getByText(/hello seller/i)).toBeInTheDocument();

		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		expect(screen.getByText(/seller/i)).toBeInTheDocument();
	});
});
