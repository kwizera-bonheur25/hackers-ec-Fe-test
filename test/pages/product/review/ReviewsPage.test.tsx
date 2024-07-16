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
import ReviewsPage from '../../../../src/pages/product/ReviewsPage';
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
			const role = db.roles.create({ roleName: 'BUYER' });
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
				return HttpResponse.json({
					data: reviewData,
				});
			}),
		);
		server.use(
			http.post(`${import.meta.env.VITE_API_BASE_URL}/reviews`, () => {
				return HttpResponse.json({
					data: {
						userId: `${userData[0].id}`,
						productId: `${productData[0].id}`,
						feedBack: 'Dope-Feedback',
						ratings: 3,
						user: userData[0],
						product: productData[0],
					},
				});
			}),
		);

		server.use(
			http.patch(
				`${import.meta.env.VITE_API_BASE_URL}/reviews/${reviewData[0].id}`,
				() => {
					return HttpResponse.json({
						data: {
							userId: `${userData[0].id}`,
							productId: `${productData[0].id}`,
							feedBack: 'Dope-Feedback',
							ratings: 3,
							user: userData[0],
							product: productData[0],
						},
					});
				},
			),
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
		}
	};

	it('it should render all review page', async () => {
		await renderReviewPage();
		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();
		const Customerreviews = screen.getByText(/Customer reviews/i);
		const Reviewthisproduct = screen.getByText(/Review this product/i);
		const Submityourreview = screen.getByTestId('first-button-submit-review');
		const Topreviews = screen.getByText(/Top reviews/i);
		expect(Customerreviews).toBeInTheDocument();
		expect(Topreviews).toBeInTheDocument();
		expect(Reviewthisproduct).toBeInTheDocument();
		expect(Submityourreview).toBeInTheDocument();
		const firstName = screen.getByText(/kabera/i);
		const lastName = screen.getByText(/joe/i);
		const AwesomeProduct = screen.getByText(/Awesome product/i);
		expect(AwesomeProduct).toBeInTheDocument();
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		const form = screen.getByText(
			/1 star for a poor experience. 5 stars for a very good experience./i,
		);
		expect(form).toBeInTheDocument();
		expect(screen.queryByText(/Please rate this product/i)).toBeNull();
		await userEvent.click(Submityourreview);
		await userEvent.click(Submityourreview);
		expect(screen.queryByText(/Please rate this product/i)).toBeNull();
	});
	it('it should render review form', async () => {
		await renderReviewPage();
		const Submityourreview = screen.getByTestId('first-button-submit-review');
		expect(Submityourreview).toBeInTheDocument();
		const rateButton = screen.getByTestId('rate-button');
		expect(rateButton).toBeInTheDocument();
		const textArea = screen.getByTitle('textArea');
		expect(textArea).toBeInTheDocument();
		await userEvent.type(textArea, 'awesome product!');
		const rev = screen.getByText(/awesome product/i);
		expect(rev).toBeInTheDocument();
	});
	it('should tell user that feedback and rating is needed', async () => {
		await renderReviewPage();
		const Submityourreview = screen.getByTestId('submit-review-form');
		expect(Submityourreview).toBeInTheDocument();
		await userEvent.click(Submityourreview);
		expect(screen.getByText(/Please rate this product/i)).toBeInTheDocument();
		const textArea = screen.getByTitle('textArea');
		expect(textArea).toBeInTheDocument();
		await userEvent.clear(textArea);
		expect(
			screen.getByText(/feedBack field can't be empty!/i),
		).toBeInTheDocument();
	});
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
		expect(successMessage).toHaveBeenCalledOnce();
	});
	it('it should test rate tabler form', async () => {
		await renderReviewPage();
		const dropBut = screen.getByTestId('drop-down-tab-rate');
		expect(dropBut).toBeInTheDocument();
		expect(screen.queryByText(/star-rate-5/i)).toBeNull();
		await userEvent.click(dropBut);
		const star5 = screen.getByTestId('star-rate-5');
		expect(star5).toBeInTheDocument();
		const pageWrappper = screen.getByTestId('page-wrapper');
		expect(pageWrappper).toBeInTheDocument();
		await userEvent.click(pageWrappper);
		expect(screen.queryByText(/star-rate-5/i)).toBeNull();
	});
	it('render review page', async () => {
		render(
			<AllProvider>
				<ReviewsPage />
			</AllProvider>,
		);
		const Customerreviews = screen.getByText(/Customer reviews/i);
		const Reviewthisproduct = screen.getByText(/Review this product/i);
		const Submityourreview = screen.getByTestId('first-button-submit-review');
		const Topreviews = screen.getByText(/Top reviews/i);
		expect(Customerreviews).toBeInTheDocument();
		expect(Topreviews).toBeInTheDocument();
		expect(Reviewthisproduct).toBeInTheDocument();
		expect(Submityourreview).toBeInTheDocument();
	});
	it('should edit review of ', async () => {
		await renderReviewPage();
		vi.mock('../../../../src/utils/userDetails', () => ({
			__esModule: true,
			default: () => ({ id: `0b52e82c-70a7-4ff3-aad7-8f6a3e406f5c` }),
		}));
		vi.mock('../../hooks/useToken', () => ({
			__esModule: true,
			default: () => ({ accessToken: 'fake-token' }),
		}));
		const filledStars = screen.getAllByTitle('star-rate-filled');
		expect(filledStars).toHaveLength(4);
		const emptyStars = screen.getAllByTitle('star-rate-empty');
		expect(emptyStars).toHaveLength(1);
		const textArea = screen.getByTitle('textArea');
		expect(textArea).toBeInTheDocument();
		await userEvent.type(textArea, 'release new product!');
		const Submityourreview = screen.getByTestId('submit-review-form');
		expect(Submityourreview).toBeInTheDocument();
		await userEvent.click(Submityourreview);
		expect(successMessage).toHaveBeenCalledOnce();
	});
});
