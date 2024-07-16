import AdminDashboardAllUser from '../../../src/pages/Admin/DashboardGetUser';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, expect } from 'vitest';
import { db } from '../../mock/db';
import { server } from '../../mock/server';
import { http, HttpResponse } from 'msw';
import AllProvider from '../../../src/utils/AllProvider';
import userEvent from '@testing-library/user-event';

type userTYpe = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	Active: string;
	role: string;
};

type roleType = {
	id: string;
	roleName: string;
};

describe('Dashboard getuser page', () => {
	const userData: userTYpe[] = [];
	const roleData: roleType[] = [];

	beforeAll(() => {
		[1].map(() => {
			const role = db.roles.create({ roleName: 'ADMIN' });
			roleData.push(role);
		});
		[1].map((item) => {
			const users = db.users.create({
				firstName: 'kabera',
				lastName: 'joe',
				email: `johndoe${item}@example.com`,
				role: `${roleData[0].id}`,
				Active: 'Active',
			});
			userData.push(users);
		});
	});

	afterAll(() => {
		const userIds = userData.map((item) => item.id);
		const roleIds = roleData.map((item) => item.id);
		db.roles.deleteMany({ where: { id: { in: roleIds } } });
		db.users.deleteMany({ where: { id: { in: userIds } } });
	});

	const renderComponent = async () => {
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

		render(
			<AllProvider>
				<AdminDashboardAllUser />
			</AllProvider>,
		);
	};
	test('it should render table', async () => {
		await renderComponent();
		const loader = screen.getByRole('progressbar');
		expect(loader).toBeInTheDocument();
		await waitForElementToBeRemoved(loader);
		expect(loader).not.toBeInTheDocument();
		const firstName = screen.getByText(/kabera/i);
		const lastName = screen.getByText(/joe/i);
		const email = screen.getByText(/johndoe1@example.com/i);
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		expect(email).toBeInTheDocument();
	});

	test('it should display butoverlay ', async () => {
		await renderComponent();
		const buttonWithDots = screen.getByTestId('dots-button');
		await userEvent.click(buttonWithDots);
		expect(screen.getByText(/Edit role/i)).toBeInTheDocument();
		expect(screen.getByText(/view user details/i)).toBeInTheDocument();
	});
	test('it should display email searched by an admin ', async () => {
		await renderComponent();
		const sInput = screen.getByPlaceholderText('Search by email');
		await userEvent.type(sInput, 'john');
		const email = screen.getByText(/johndoe1@example.com/i);
		expect(email).toBeInTheDocument();
	});
});
