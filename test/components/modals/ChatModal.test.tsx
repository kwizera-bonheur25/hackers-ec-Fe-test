import { render, screen } from '@testing-library/react';
import ChatModal from '../../../src/components/chat/ChatModal';
import AllProvider from '../../Utils/AllProvider';
import { localStorageMock } from '../../mock/localStorage';
import { DynamicData } from '../../../src/@types/DynamicData';
import { jwtDecode } from 'jwt-decode';
import fetchInfo from '../../../src/utils/userDetails';

vi.mock('jwt-decode', () => ({
	jwtDecode: vi.fn(),
}));

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

beforeAll(() => {
	window.HTMLElement.prototype.scrollIntoView = function () {};
});

describe('Chat component', () => {
	it('should render a popup to redirect a user when not logged in', () => {
		render(
			<AllProvider>
				<ChatModal />
			</AllProvider>,
		);
		expect(screen.getAllByText(/Welcome!/i));
	});

	it('should render chat component when a user is logged in', () => {
		const mockToken = 'valid-token';
		const mockDecoded = { id: 1, role: 'BUYER' };

		localStorage.setItem('access_token', mockToken);
		(jwtDecode as unknown as DynamicData).mockReturnValue(mockDecoded);

		const result = fetchInfo();
		expect(result).toEqual(mockDecoded);
		expect(jwtDecode).toHaveBeenCalledWith(mockToken);
		render(
			<AllProvider>
				<ChatModal />
			</AllProvider>,
		);
		expect(screen.getAllByText(/Shop Trove Live Chat/i));
	});
});
