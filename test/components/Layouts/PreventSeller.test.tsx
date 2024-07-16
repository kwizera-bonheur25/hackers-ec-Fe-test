import { render, screen } from '@testing-library/react';
import { jwtDecode } from 'jwt-decode';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DynamicData } from '../../../src/@types/DynamicData';
import fetchInfo from '../../../src/utils/userDetails';
import { localStorageMock } from '../../mock/localStorage';
import PreventSeller from '../../../src/components/Layouts/PreventSeller';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Protected routes compoennt with userInfo function', () => {
	const renderComponent = () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<Routes>
					<Route path="/" element={<PreventSeller roles={['BUYER']} />}>
						<Route index element={<div>Hello userq</div>} />
					</Route>
				</Routes>
			</MemoryRouter>,
		);
	};
	it('should return decoded token when token is valid', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		const result = fetchInfo();
		expect(result).toEqual(mockDecoded);
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);

		renderComponent();
		expect(screen.getByText(/hello user/i)).toBeInTheDocument();
	});
	it('should return decoded token when token is valid', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		const result = fetchInfo();
		expect(result).toEqual(mockDecoded);
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);

		renderComponent();
		expect(screen.queryByText(/hello user/i)).toBeNull();
	});
});
