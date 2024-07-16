import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';
import { db } from '../mock/db';
import { http, HttpResponse } from 'msw';
import { server } from '../mock/server';
import CategoryModel from '../../src/components/CategoryModel';
import AllProvider from '../Utils/AllProvider';
import { manipulateSearchInput } from '../../src/redux/features/SearchSlice';
import { store } from '../../src/redux/store';
type CategoryType = {
	id: string;
	name: string;
};
global.URL.createObjectURL = vi.fn(() => 'mocked-url');
vi.mock('../redux/hooks/hooks', () => ({
	useAppDispatch: vi.fn(),
	useAppSelector: vi.fn(),
}));
describe('it should display categories', () => {
	const categories: CategoryType[] = [];
	beforeAll(() => {
		[1, 2, 3].map((item) => {
			const category = db.categories.create({ name: `Category ${item}` });
			categories.push(category);
		});
	});

	const renderComponent = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, () =>
				HttpResponse.json({
					data: categories,
				}),
			),
		);
		const setOpenModelMock = vi.fn();
		render(
			<AllProvider>
				<CategoryModel setOpenModel={() => setOpenModelMock} openModel={true} />
			</AllProvider>,
		);

		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();

		return {
			categoryElement: screen.getByText('Category 1'),
		};
	};
	it('should get all categories and display a select with all categories as options', async () => {
		const dispatchSpy = vi.spyOn(store, 'dispatch');
		const { categoryElement } = await renderComponent();
		expect(categoryElement).toBeInTheDocument();

		fireEvent.click(categoryElement);

		expect(dispatchSpy).toHaveBeenCalledWith(
			manipulateSearchInput({ categoryName: 'Category 1' }),
		);
	});
});
