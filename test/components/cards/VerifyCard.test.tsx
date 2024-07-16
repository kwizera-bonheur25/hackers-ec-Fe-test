import { render, screen } from '@testing-library/react';
import VerifiedCard from '../../../src/components/cards/VerifiedCard';
import { Provider } from 'react-redux';
import { store } from '../../../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
describe('Verify account card', () => {
	it('should render the VerifyCard component', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<VerifiedCard />
				</BrowserRouter>
			</Provider>,
		);
		expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
	});
});
