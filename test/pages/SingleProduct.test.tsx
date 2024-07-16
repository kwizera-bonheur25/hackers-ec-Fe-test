import { screen, render } from '@testing-library/react';
import SingleProduct from '../../src/pages/SingleProduct';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { DynamicData } from '../../src/@types/DynamicData';
import { db } from '../mock/db';
import { server } from '../mock/server';
import { HttpResponse, http } from 'msw';
import AllProvider from '../Utils/AllProvider';
type userTYpe = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	Active: string;
	role: string;
};
type product = {
	id?: string;
	name: string;
};

type reviewType = {
	id: string;
	userId: string;
	productId: string;
	feedBack: string;
	ratings: number;
	user?: DynamicData;
	product?: DynamicData;
};
type roleType = {
	id: string;
	roleName: string;
};
describe('Single product component', () => {
	const userData: userTYpe[] = [];
	const reviewData: reviewType[] = [];
	const roleData: roleType[] = [];
	const productData: product[] = [];

	beforeAll(() => {
		[1].map(() => {
			const role = db.roles.create({ roleName: 'BUYER' });
			roleData.push(role);
		});

		const users = db.users.create({
			firstName: 'kabera',
			lastName: 'joe',
			email: `johndoe${2}@example.com`,
			role: `${roleData[0].id}`,
			Active: 'Active',
		});
		userData.push(users);

		const prod = db.products.create({
			name: 'BMW SUV',
		});
		productData.push(prod);
		const rev = db.reviews.create({
			userId: `${userData[0].id}`,
			productId: `${productData[0].id}`,
			feedBack: 'Awesome product',
			ratings: 4,
			user: users,
			product: prod,
		});
		reviewData.push(rev);
	});
	afterAll(() => {
		const userIds = userData.map((item) => item.id);
		const roleIds = roleData.map((item) => item.id);
		const reviewIds = reviewData.map((item) => item.id);
		db.roles.deleteMany({ where: { id: { in: roleIds } } });
		db.users.deleteMany({ where: { id: { in: userIds } } });
		db.reviews.deleteMany({ where: { id: { in: reviewIds } } });
	});

	const renderProductwithReviewPage = async () => {
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/roles`, () => {
				return HttpResponse.json({
					data: roleData,
				});
			}),
		);
		server.use(
			http.get(`${import.meta.env.VITE_API_BASE_URL}/users`, () => {
				return HttpResponse.json({
					data: userData,
				});
			}),
		);
		server.use(
			http.get(
				`${import.meta.env.VITE_API_BASE_URL}/products/${productData[0].id}`,
				() => {
					return HttpResponse.json({
						data: productData,
					});
				},
			),
		);
		server.use(
			http.get(
				`${import.meta.env.VITE_API_BASE_URL}/products/${productData[0].id}/reviews`,
				() => {
					return HttpResponse.json({
						data: reviewData,
					});
				},
			),
		);
		if (reviewData.length > 0) {
			render(
				<AllProvider>
					<SingleProduct />
				</AllProvider>,
			);
		}
	};

	it('renders the single product component', async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<SingleProduct />
				</MemoryRouter>
			</Provider>,
		);
		expect(screen.getByText(/Top reviews/i)).toBeInTheDocument();
		expect(screen.getAllByText(/Submit your review/i)).toHaveLength(2);
		expect(
			screen.getByText(/share your feelings with us/i),
		).toBeInTheDocument();
		expect(screen.getByText(/Next/i)).toBeInTheDocument();
		expect(screen.getByText('Previous')).toBeInTheDocument();
		const Customerreviews = screen.getByText(/Customer reviews/i);
		const Reviewthisproduct = screen.getByText(/Review this product/i);
		const Submityourreview = screen.getByTestId('first-button-submit-review');
		expect(Customerreviews).toBeInTheDocument();
		expect(Reviewthisproduct).toBeInTheDocument();
		expect(Submityourreview).toBeInTheDocument();
		const dropBut = screen.getByTestId('drop-down-tab-rate');
		expect(dropBut).toBeInTheDocument();
		await userEvent.click(dropBut);
		const star5 = screen.getByTestId('star-rate-5');
		expect(star5).toBeInTheDocument();
	});
	it('it should render product with review', async () => {
		await renderProductwithReviewPage();
	});
});
