import { screen, render } from '@testing-library/react';
import {
	AddProducts,
	DashboardContent,
	DashboardProducts,
	DashboardSingleProducts,
	EditRole,
	UserRoles,
	Users,
} from '../../../../src/utils/DashboardUtils';
import { localStorageMock } from '../../../mock/localStorage';
import { jwtDecode } from 'jwt-decode';
import { DynamicData } from '../../../../src/@types/DynamicData';
import AllProvider from '../../../Utils/AllProvider';
import AdminDashboardAllUser from '../../../../src/pages/Admin/DashboardGetUser';
import EditUser from '../../../../src/pages/Admin/EditUserRoles';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Dashboard products', () => {
	it('should render products page in dashboard', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should render products page in admin dashboard  and return notfound', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Hello Admin/i)).toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Hello Seller/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardProducts />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardContent />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<AdminDashboardAllUser />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<AdminDashboardAllUser />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<DashboardSingleProducts />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<AddProducts />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<EditUser />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<EditUser />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<UserRoles />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<UserRoles />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<UserRoles />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<Users />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<Users />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<Users />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});

	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'SELLER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<EditRole />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<EditRole />
			</AllProvider>,
		);

		expect(screen.getByText(/Unauthorized access/i)).toBeInTheDocument();
	});
	it('should', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'ADMIN' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		render(
			<AllProvider>
				<EditRole />
			</AllProvider>,
		);

		expect(screen.queryByText(/Unauthorized access/i)).not.toBeInTheDocument();
	});
});
