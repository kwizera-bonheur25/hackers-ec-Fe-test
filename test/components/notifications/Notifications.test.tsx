/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Notification from '../../../src/components/notification/Notification';
import AllProvider from '../../Utils/AllProvider';
import userEvent from '@testing-library/user-event';
import { addNotification } from '../../../src/redux/features/notificationSlice';
import { store } from '../../../src/redux/store';
// import { NotificationTypes } from '../../../src/@types/notification';

vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(() =>
	Promise.resolve(),
);

describe('Notification component', () => {
	const renderComponent = () => {
		render(<Notification />, { wrapper: AllProvider });
		return {
			user: userEvent.setup(),
			bell: screen.getByRole('img'),
		};
	};
	it('should render an notification component with a bell icon', () => {
		const { bell } = renderComponent();
		expect(bell).toBeInTheDocument();
	});
	it('should show notification tab when a user click on the bell', async () => {
		const notification = {
			id: '1',
			message: 'Test Notification',
			unread: true,
			createdAt: new Date().toISOString(),
		};
		store.dispatch(addNotification(notification));

		const { bell, user } = renderComponent();
		await user.click(bell);
		expect(screen.getByLabelText('notification-tab')).toBeInTheDocument();
		expect(screen.getByText('Test Notification')).toBeInTheDocument();
	});

	it('should show a toast when new message', async () => {
		renderComponent();
		const socket = require('socket.io-client')(
			import.meta.env.VITE_API_APP_ROOT_URL,
		);

		socket.emit('notification-user1', {
			id: '2',
			message: 'New Notification',
			unread: true,
			createdAt: new Date().toISOString(),
		});

		const notificatioNber = screen.getByLabelText('notification-number');
		expect(notificatioNber).toHaveTextContent('1');
	});
});
