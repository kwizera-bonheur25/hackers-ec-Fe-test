import { render, screen } from '@testing-library/react';
import { jwtDecode } from 'jwt-decode';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DynamicData } from '../../../src/@types/DynamicData';
import fetchInfo from '../../../src/utils/userDetails';
import { localStorageMock } from '../../mock/localStorage';
import ProtectedDashboard from '../../../src/components/Layouts/ProtectedDashboard';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Protected routes compoennt with userInfo function', () => {
	const renderComponent = () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<ProtectedDashboard />}>
						<Route index element={<div>Hello seller</div>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);
	};
	it('should return decoded token when token is valid', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		const result = fetchInfo();
		expect(result).toEqual(mockDecoded);
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);

		renderComponent();
		expect(screen.getByText(/hello seller/i)).toBeInTheDocument();
	});

	it('should return null when token is invalid', () => {
		const mockToken = 'invalid-token';
		localStorage.setItem('access_token', mockToken);

		(jwtDecode as unknown as DynamicData).mockImplementation(() => {
			throw new Error('Invalid token');
		});

		const result = fetchInfo();
		expect(result).toBeNull();
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);
		renderComponent();
		expect(screen.queryByText(/hello seller/i)).toBeNull();
	});

	it('should return null when there is no token', () => {
		localStorage.clear();
		const result = fetchInfo();
		expect(result).toBeNull();
	});
});
