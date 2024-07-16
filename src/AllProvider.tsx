import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';

const AllProvider = ({ children }: PropsWithChildren) => {
	return (
		<Provider store={store}>
			<BrowserRouter>{children}</BrowserRouter>
		</Provider>
	);
};

export default AllProvider;
