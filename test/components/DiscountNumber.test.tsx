import { render, screen } from '@testing-library/react';
import DiscountNumber from '../../src/components/DiscountNumber';
import AllProvider from '../Utils/AllProvider';

describe('Discount Component', () => {
	it('render the correct content', () => {
		render(<DiscountNumber num={2} />, { wrapper: AllProvider });
		expect(screen.getByText('2 %')).toBeInTheDocument();
	});
});
