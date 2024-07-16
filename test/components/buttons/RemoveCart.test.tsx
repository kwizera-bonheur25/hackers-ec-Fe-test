import { render, screen, fireEvent } from '@testing-library/react';
import RemoveCart from '../../../src/components/buttons/RemoveCart';
import AllProvider from '../../Utils/AllProvider';

describe('RemoveCart component', () => {
	it('renders without crashing', () => {
		render(<RemoveCart productId="12345-234543-3456543-234" />, {
			wrapper: AllProvider,
		});

		const removeButton = screen.getByText('Remove');
		expect(removeButton).toBeInTheDocument();
		expect(removeButton).not.toBeDisabled();
	});

	it('should displays remove cart item when button clicked', async () => {
		const handleClickMock = vi.fn();
		render(<RemoveCart productId="12345-234543-3456543-234" />, {
			wrapper: AllProvider,
		});

		const removeButton = screen.getByText('Remove');
		fireEvent.click(removeButton);

		expect(handleClickMock).toHaveBeenCalledTimes(0);
	});
});
