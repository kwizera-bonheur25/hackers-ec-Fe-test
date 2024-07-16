import { fireEvent, render, screen } from '@testing-library/react';
import CartQuantity from '../../../src/components/buttons/CartQuantity';
import AllProvider from '../../Utils/AllProvider';

describe('CartQuantity Component', () => {
	it('should render the quantity and buttons', () => {
		const handleAddQuantity = vi.fn();
		const handleSubtractQuantity = vi.fn();
		const quantity = 0;

		render(<CartQuantity productId="234543" />, { wrapper: AllProvider });

		const quantitySpan = screen.getByText(quantity);
		expect(quantitySpan).toBeInTheDocument();

		const subtractButton = screen.getByText('-');
		const addButton = screen.getByText('+');
		expect(subtractButton).toBeInTheDocument();
		expect(addButton).toBeInTheDocument();

		fireEvent.click(subtractButton);
		fireEvent.click(addButton);
		expect(handleSubtractQuantity).toHaveBeenCalledTimes(0);
		expect(handleAddQuantity).toHaveBeenCalledTimes(0);
	});
});
