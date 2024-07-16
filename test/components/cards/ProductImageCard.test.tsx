import { it, expect, describe } from 'vitest';
import ProductImageCard from '../../../src/components/cards/ProductImageCard';
import { render, screen } from '@testing-library/react';
describe('group', () => {
	it('should', () => {
		render(<ProductImageCard idx={1} image="image.jpeg" />);

		expect(screen.getByRole('img')).toBeInTheDocument();
	});
});
