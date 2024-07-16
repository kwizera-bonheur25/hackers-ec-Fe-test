import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import CartPage from '../../../src/components/carts/CartPage';
import { useAppSelector } from '../../../src/redux/hooks/hooks';
import AllProvider from '../../Utils/AllProvider';

vi.mock('../../../src/redux/hooks/hooks', () => ({
	useAppSelector: vi.fn(),
}));

vi.mock('../../../src/components/buttons/CartQuantity', () => ({
	__esModule: true,
	default: ({ productId }: { productId: string }) => (
		<div data-testid={`cart-quantity-${productId}`}>CartQuantity</div>
	),
}));

vi.mock('../../../src/components/buttons/RemoveCart', () => ({
	__esModule: true,
	default: ({ productId }: { productId: string }) => (
		<button data-testid={`remove-cart-${productId}`}>RemoveCartButton</button>
	),
}));

describe('CartPage', () => {
	beforeEach(() => {
		(useAppSelector as Mock).mockReturnValue({
			carts: {
				total: 2000,
				products: [
					{
						id: '1',
						name: 'Product 1',
						price: 1000,
						image: 'image1.jpg',
					},
					{
						id: '2',
						name: 'Product 2',
						price: 1000,
						image: 'image2.jpg',
					},
				],
			},
			numberOfItem: 2,
		});
	});

	it('renders the CartPage component correctly', () => {
		render(<CartPage />, { wrapper: AllProvider });

		expect(screen.getByText('Number of Items:')).toBeInTheDocument();
		expect(screen.getByText('2 items')).toBeInTheDocument();
		expect(screen.getByText('Total price:')).toBeInTheDocument();

		expect(screen.getByText('Product 1')).toBeInTheDocument();
		expect(screen.getByText('Product 2')).toBeInTheDocument();

		expect(screen.getByTestId('cart-quantity-1')).toBeInTheDocument();
		expect(screen.getByTestId('cart-quantity-2')).toBeInTheDocument();
		expect(screen.getByTestId('remove-cart-1')).toBeInTheDocument();
		expect(screen.getByTestId('remove-cart-2')).toBeInTheDocument();
	});
});
