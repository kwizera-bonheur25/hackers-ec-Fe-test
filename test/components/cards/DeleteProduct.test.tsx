import { render, screen, fireEvent } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import AllProvider from '../../Utils/AllProvider';
import DeleteProduct from '../../../src/components/cards/DeleteProduct';
import { modalContext } from '../../../src/components/cards/SellerProductsModal';

const mockChangeModal = vitest.fn();
const MockModalProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<modalContext.Provider value={{ changeModal: mockChangeModal }}>
			{children}
		</modalContext.Provider>
	);
};

describe('Product delete modal', () => {
	it('should open modal when the delete button is clicked', () => {
		const modal = (idx: string) => idx;
		const item = { id: 'item123' };

		render(
			<MockModalProvider>
				<DeleteProduct item={item} handleChange={modal} />
			</MockModalProvider>,
			{
				wrapper: AllProvider,
			},
		);

		expect(
			screen.getByText(/Are you sure you want to delete this?/i),
		).toBeInTheDocument();
		expect(screen.getByText(/delete product/i)).toBeInTheDocument(),
			fireEvent.click(screen.getByText(/no/i));
		expect(mockChangeModal).toHaveBeenCalled();
		fireEvent.click(screen.getByText(/yes/i));
	});
});
