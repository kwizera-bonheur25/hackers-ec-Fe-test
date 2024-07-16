import { screen, render } from '@testing-library/react';
import ProductModel from '../../../src/components/ProductModel';

describe('Open modal products', () => {
	it('should open modal of products', () => {
		render(
			<ProductModel
				openModel={true}
				toggleModel={function (): void {
					console.log('Test');
				}}
			/>,
		);
		expect(screen.getByText(/edit/i)).toBeInTheDocument();
	});
});
