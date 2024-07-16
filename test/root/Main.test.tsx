import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../src/App';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import '../../src/index.css';
import React from 'react';
describe('Main Component', () => {
	it('renders App without error', () => {
		render(
			<React.StrictMode>
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</React.StrictMode>,
		);
	});
});
