import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';

describe('App Component', () => {
	it('renders Home and About pages within Layout', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>,
		);
	});
});
