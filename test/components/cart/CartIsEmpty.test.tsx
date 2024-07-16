import { render, screen } from '@testing-library/react';
import CartIsEmpty from '../../../src/components/carts/CartIsEmpty';

vi.mock('../../../src/components/buttons/BackButton', () => ({
	__esModule: true,
	default: ({ title }: { title: string }) => <button>{title}</button>,
}));

vi.mock('../../../src/utils/images', () => ({
	emptyCart: 'empty-cart-icon',
}));

describe('CartIsEmpty Component', () => {
	it('should renders empty cart image', () => {
		render(<CartIsEmpty />);
		const image = screen.getByAltText('empty cart icon');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', 'empty-cart-icon');
	});

	it('should renders "Your Cart Is Empty" text', () => {
		render(<CartIsEmpty />);
		const heading = screen.getByText('Your Cart Is Empty');
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveClass('text-center font-bold text-2xl');
	});

	it('should renders descriptive text', () => {
		render(<CartIsEmpty />);
		const description = screen.getByText(
			"Look like you haven't made your choice yet.",
		);
		expect(description).toBeInTheDocument();
		expect(description).toHaveClass('text-center');
	});

	it('should renders BackButton with correct text', () => {
		render(<CartIsEmpty />);
		const button = screen.getByText('Start Shopping');
		expect(button).toBeInTheDocument();
		expect(button.tagName).toBe('BUTTON');
	});
});
