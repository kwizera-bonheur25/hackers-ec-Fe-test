import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import AddProductForm from '../../../src/components/Forms/AddProductForm';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { http, HttpResponse } from 'msw';
import { db } from '../../mock/db';
import { server } from '../../mock/server';
import AllProvider from '../../../src/utils/AllProvider';
import { it, expect, describe } from 'vitest';
import userEvent from '@testing-library/user-event';
import AddProduct from '../../../src/pages/dashboard/seller/AddProduct';

type CategoryType = {
	id: string;
	name: string;
};

global.URL.createObjectURL = vi.fn(() => 'mocked-url');

describe('Add product form component', () => {
	const categories: CategoryType[] = [];
	beforeAll(() => {
		[1, 2, 3].map((item) => {
			const category = db.categories.create({ name: `Category ${item}` });
			categories.push(category);
		});
	});

	afterAll(() => {
		const categoryIds = categories?.map((category) => category.id);
		db.categories.deleteMany({ where: { id: { in: categoryIds } } });
	});

	const renderComponent = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, () =>
				HttpResponse.json({
					data: categories,
				}),
			),
		);

		render(
			<AllProvider>
				<DndProvider backend={HTML5Backend}>
					<AddProductForm />
				</DndProvider>
			</AllProvider>,
		);

		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		return {
			user: userEvent.setup(),
			productName: screen.getByPlaceholderText(/name/i),
			productPrice: screen.getByPlaceholderText(/price/i),
			productDiscount: screen.getByPlaceholderText(/discount/i),
			productQuantity: screen.getByPlaceholderText(/quantity/i),
			selectOption: screen.getByLabelText(/select-category/i),
			options: screen.findAllByRole('option'),
			productExpiryDate: screen.getByPlaceholderText('2525-12-03'),
		};
	};

	it('should render a loader on the page while fetching categories', () => {
		render(
			<AllProvider>
				<DndProvider backend={HTML5Backend}>
					<AddProductForm />
				</DndProvider>
			</AllProvider>,
		);
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	it('should get all categories and display a select with all categories as options', async () => {
		const { user, selectOption, options } = await renderComponent();

		expect(selectOption).toBeInTheDocument();
		await user.click(selectOption);
		expect((await options).length).toBeGreaterThan(1);
	});

	it('should render a form with all input field', async () => {
		const {
			productName,
			productPrice,
			productDiscount,
			productQuantity,
			productExpiryDate,
		} = await renderComponent();

		expect(productName).toBeInTheDocument();
		expect(productPrice).toBeInTheDocument();
		expect(productDiscount).toBeInTheDocument();
		expect(productQuantity).toBeInTheDocument();
		expect(productExpiryDate).toBeInTheDocument();
	});

	it('should create a product', async () => {
		const {
			user,
			productName,
			productPrice,
			productDiscount,
			productQuantity,
			productExpiryDate,
			selectOption,
		} = await renderComponent();

		const files = [
			new File(['image1'], 'hello.geojson', { type: 'application/json' }),
			new File(['image2'], 'hello2.geojson', { type: 'application/json' }),
		];

		const input = screen.getByLabelText('image-input');

		await user.type(productName, 'BMW');
		await user.type(productPrice, '100000');
		await user.type(productDiscount, '100');
		await user.type(productQuantity, '250');
		await user.type(productExpiryDate, '2523-06-29');
		await user.upload(input, files);
		const firstOption = selectOption.querySelector(
			'option',
		) as unknown as HTMLOptionElement;
		await user.selectOptions(selectOption, firstOption);

		const button = screen.getByRole('button', { name: /Save/i });
		await user.click(button);

		expect(screen.queryByText(/processing/i));
	});

	it('should should render a product page component', async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, () =>
				HttpResponse.json({
					data: categories,
				}),
			),
		);

		render(
			<AllProvider>
				<DndProvider backend={HTML5Backend}>
					<AddProduct />
				</DndProvider>
			</AllProvider>,
		);

		const loader = screen.getByRole('progressbar');

		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/price/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/discount/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/quantity/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText('2525-12-03')).toBeInTheDocument();
	});
});
