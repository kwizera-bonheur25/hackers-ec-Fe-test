import { render } from '@testing-library/react';
import Cart from '../../../src/pages/carts/Carts';
import AllProvider from '../../Utils/AllProvider';

describe('cart', () => {
	it('its should cart component', () => {
		render(
			<AllProvider>
				<Cart />
			</AllProvider>,
		);
	});
});
