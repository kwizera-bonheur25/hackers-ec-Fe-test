import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Notification from '../../../src/components/notification/Notification';
import { DynamicData } from '../../../src/@types/DynamicData';
import { Toaster } from 'sonner';
import userEvent from '@testing-library/user-event';

vi.mock('socket.io-client');

vi.mock('../../hooks/useToken', () => ({
	__esModule: true,
	default: () => ({ accessToken: 'fake-token' }),
}));
vi.mock('../../utils/userDetails', () => ({
	__esModule: true,
	default: () => ({ id: 'user-id' }),
}));
vi.mock('../../redux/features/notificationSlice', () => ({
	addNotification: (notification: DynamicData) => ({
		type: 'ADD_NOTIFICATION',
		payload: notification,
	}),
	userNotification: (notifications: DynamicData) => ({
		type: 'USER_NOTIFICATION',
		payload: notifications,
	}),
}));
vi.mock('../../utils/images', () => ({
	notificationSound: 'notification.mp3',
}));

const mockStore = configureStore([]);
const initialState = {
	notifications: {
		notifications: [],
		value: 0,
	},
};
const store = mockStore(initialState);

describe('Notification Component', () => {
	it('should render notification bell and no notifications initially', () => {
		render(
			<Provider store={store}>
				<Notification />
				<Toaster position="top-right" richColors />
			</Provider>,
		);

		expect(screen.getByRole('img', { name: 'bell-image' })).toBeInTheDocument();
		expect(
			screen.queryByLabelText('notification-number'),
		).not.toBeInTheDocument();
	});

	it('should show notification number when there are notifications', () => {
		const modifiedStore = mockStore({
			notifications: {
				notifications: [
					{
						id: '1',
						message: 'Test Notification',
						createdAt: new Date(),
						unread: true,
					},
				],
				value: 1,
			},
		});

		render(
			<Provider store={modifiedStore}>
				<Notification />
				<Toaster position="top-right" richColors />
			</Provider>,
		);

		expect(screen.getByLabelText('notification-number')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
	});

	it('should toggle notification list visibility on bell icon click', async () => {
		render(
			<Provider store={store}>
				<Notification />
				<Toaster position="top-right" richColors />
			</Provider>,
		);

		const user = userEvent.setup();

		const bellIcon = screen.getByRole('img', { name: 'bell-image' });
		await user.click(bellIcon);

		expect(screen.getByLabelText('notification-tab')).toBeInTheDocument();
	});

	it('should show notifications in the list when active', async () => {
		const modifiedStore = mockStore({
			notifications: {
				notifications: [
					{
						id: '1',
						message: 'Test Notification 1',
						createdAt: new Date(),
						unread: true,
					},
					{
						id: '2',
						message: 'Test Notification 2',
						createdAt: new Date(),
						unread: false,
					},
				],
				value: 2,
			},
		});

		render(
			<Provider store={modifiedStore}>
				<Notification />
				<Toaster position="top-right" richColors />
			</Provider>,
		);

		const user = userEvent.setup();

		const bellIcon = screen.getByRole('img', { name: 'bell-image' });
		await user.click(bellIcon);

		expect(screen.getByLabelText('notification-tab')).toBeInTheDocument();
		expect(screen.getByText('Test Notification 1')).toBeInTheDocument();
		expect(screen.getByText('Test Notification 2')).toBeInTheDocument();
	});
});
