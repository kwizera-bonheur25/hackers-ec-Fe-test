import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../src/components/Footer';
import Nav from '../../src/components/Nav';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
describe('Layout Component', () => {
	it('renders the Nav, Outlet, and Footer components', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<Nav />
					<Footer />
				</MemoryRouter>
				,
			</Provider>,
		);
	});
});
