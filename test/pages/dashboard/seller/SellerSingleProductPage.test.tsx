import { render, screen } from '@testing-library/react';
import SellerSingleProduct from '../../../../src/pages/dashboard/seller/SellerSingleProduct';
import AllProvider from '../../../Utils/AllProvider';

describe('Landing page products components', () => {
	it('renders without crashing', () => {
		render(
			<AllProvider>
				<SellerSingleProduct />
			</AllProvider>,
		);
		expect(screen.getByText('Product Details')).toBeInTheDocument();
		expect(screen.getByText(/Expiry Date/i)).toBeInTheDocument();
		expect(screen.getByText(/Category/i)).toBeInTheDocument();
		expect(screen.getByText(/Price/i)).toBeInTheDocument();
		expect(screen.getByText(/Discount/i)).toBeInTheDocument();
		expect(screen.getByText(/Next/i)).toBeInTheDocument();
		expect(screen.getByText(/Previous/i)).toBeInTheDocument();
	});
});
