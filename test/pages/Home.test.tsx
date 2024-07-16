import { render, screen } from '@testing-library/react';
import Home from '../../src/pages/Home';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter } from 'react-router-dom';

describe('Home components', () => {
	it('render the correct content', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Home />
				</BrowserRouter>
			</Provider>,
		);

		expect(screen.getByText('Elevate Your Shopping'));
	});
});
