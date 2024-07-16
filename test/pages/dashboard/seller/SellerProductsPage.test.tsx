import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { db } from '../../../mock/db';
import { server } from '../../../mock/server';
import AllProvider from '../../../../src/AllProvider';
import { http, HttpResponse } from 'msw';
import SellerProductsPage from '../../../../src/pages/dashboard/seller/SellerProductsPage';

type ProductType = {
	id: string;
	name: string;
	price: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

describe('Landing page products components', () => {
	it('renders without crashing', () => {
		render(
			<AllProvider>
				<SellerProductsPage />
			</AllProvider>,
		);
	});
});

describe('Get all products', () => {
	const products: ProductType[] = [];

	beforeAll(() => {
		[1].forEach((item) => {
			const product = db.products.create({
				name: `Iphone ${item}`,
				price: `1200000 ${item}`,
			});
			products.push(product);
		});
	});

	afterAll(() => {
		const productIds = products.map((product) => product.id);
		db.products.deleteMany({ where: { id: { in: productIds } } });
	});

	const renderComponent = async () => {
		try {
			server.use(
				http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, () =>
					HttpResponse.json({ data: products }),
				),
			);

			render(
				<AllProvider>
					<SellerProductsPage />
				</AllProvider>,
			);

			const loader = screen.getByRole('progressbar');
			expect(loader).toBeInTheDocument();
			await waitForElementToBeRemoved(loader);

			return {
				name: screen.getByText(/Iphone/i),
				price: screen.getByText(/1200000/i),
			};
		} catch (error) {
			console.error('Error in renderComponent:', error);
			throw error;
		}
	};

	it('renders a loader while fetching products', () => {
		render(
			<AllProvider>
				<SellerProductsPage />
			</AllProvider>,
		);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('fetches and displays all products', async () => {
		const { name, price } = await renderComponent();
		expect(name).toBeInTheDocument();
		expect(price).toBeInTheDocument();
	});
});
