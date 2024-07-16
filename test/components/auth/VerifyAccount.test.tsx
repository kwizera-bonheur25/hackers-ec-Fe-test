import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import VerifyAccount from '../../../src/components/auth/VerifyAccount';

const mockUseAppSelector = vi.fn();
const mockUseAppDispatch = vi.fn();
vi.mock('../../../src/redux/hooks/hooks', () => ({
	useAppSelector: () => mockUseAppSelector(),
	useAppDispatch: () => mockUseAppDispatch(),
}));
describe('test the VerifyAccount component with error message if occur', () => {
	it('should render the VerifyCard component', () => {
		mockUseAppSelector.mockReturnValue({
			isLoading: false,
			isVerified: false,
			message: 'Error something went wrong',
		});
		render(
			<Provider store={store}>
				<BrowserRouter>
					<VerifyAccount />
				</BrowserRouter>
			</Provider>,
		);
		expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
	});

	it('should render the VerifyCard component with success message', () => {
		mockUseAppSelector.mockReturnValue({
			isLoading: false,
			isVerified: true,
			message: 'Verified successfully',
		});
		render(
			<Provider store={store}>
				<BrowserRouter>
					<VerifyAccount />
				</BrowserRouter>
			</Provider>,
		);
		expect(screen.getByText(/Verified successfully!!/i)).toBeInTheDocument();
	});
});
