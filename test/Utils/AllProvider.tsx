import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { BrowserRouter } from 'react-router-dom';

const AllProvider = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	);
};

export default AllProvider;
