import { render } from '@testing-library/react';
import CartPageLoader from '../../../src/components/carts/CartPageLoader';
import AllProvider from '../../Utils/AllProvider';

describe('CartPageLoader Component', () => {
	it('should renders a container with correct styles', () => {
		const { container } = render(<CartPageLoader />, { wrapper: AllProvider });
		const loaderContainer = container.firstChild;
		expect(loaderContainer).toBeInTheDocument();
	});
});
