import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import AllProvider from '../../../../src/utils/AllProvider';
import { db } from '../../../mock/db';
import { server } from '../../../mock/server';
import { HttpResponse, http } from 'msw';
import AllReview from '../../../../src/components/product/review/AllReview';
import { DynamicData } from '../../../../src/@types/DynamicData';
import userEvent from '@testing-library/user-event';
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

describe('review test', () => {
	const userData: userTYpe[] = [];
	const reviewData: reviewType[] = [];
	const roleData: roleType[] = [];
	const productData: product[] = [];
	const successMessage = vi.fn();
	const errorMessage = vi.fn();

	beforeAll(() => {
		[1].map(() => {
			const role = db.roles.create({ roleName: 'SELLER' });
			roleData.push(role);
		});

		const users = db.users.create({
			id: '0b52e82c-70a7-4ff3-aad7-8f6a3e406f5c',
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
			ratings: 1,
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
		() => server.close();
	});
	afterEach(() => server.resetHandlers());

	const renderReviewPage = async () => {
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

		server.use(
			http.post(`${import.meta.env.VITE_API_BASE_URL}/reviews`, () => {
				return new HttpResponse(null, { status: 403 });
			}),
		);
		if (reviewData.length > 0) {
			render(
				<AllProvider>
					<AllReview
						id={productData[0].id}
						successMessage={successMessage}
						Erromesage={errorMessage}
					/>
				</AllProvider>,
			);
			const loader = screen.getByRole('progressbar');
			expect(loader).toBeInTheDocument();
			await waitForElementToBeRemoved(loader);
			expect(loader).not.toBeInTheDocument();
		}
	};

	it('it should add review on product now', async () => {
		await renderReviewPage();
		const starRate = screen.getByTestId('star-rate-3');
		expect(starRate).toBeInTheDocument();
		await userEvent.click(starRate);
		const textArea = screen.getByTitle('textArea');
		expect(textArea).toBeInTheDocument();
		await userEvent.type(textArea, 'awesome product!');
		const Submityourreview = screen.getByTestId('submit-review-form');
		expect(Submityourreview).toBeInTheDocument();
		await userEvent.click(Submityourreview);
		expect(errorMessage).toHaveBeenCalledOnce();
		expect(screen.getAllByText(/Submit your review/i)).toHaveLength(2);
	});
});
