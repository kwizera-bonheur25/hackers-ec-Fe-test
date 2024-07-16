import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import DashboardSideNav from '../../src/components/DashboardSideNav';

describe('Dah sidebar components', () => {
	it('render the correct content', () => {
		const otherStyles = 'space-x-12';
		const role = 'SELLER';
		render(
			<Provider store={store}>
				<BrowserRouter>
					<DashboardSideNav
						children={<div>Hello World!</div>}
						otherStyles={otherStyles}
						role={role}
					/>
				</BrowserRouter>
			</Provider>,
		);

		expect(screen.getByText('ShopTrove'));
	});
});
