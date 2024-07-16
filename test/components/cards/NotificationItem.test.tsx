import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import NotificationItem from '../../../src/components/cards/NotificationItem';
import userEvent from '@testing-library/user-event';

describe('Notification item component', () => {
	it('should render a notification items with correct props', async () => {
		const text =
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat voluptate repellat quas sit explicabo itaque eveniet ex eum sapiente libero repellendus, velit quisquam ea. Totam libero voluptatum velit mollitia error.';

		render(<NotificationItem text={text} date="11:34" isSelected unread />);
		const showMore = screen.getByText(/more/i);
		expect(showMore).toBeInTheDocument();

		const user = userEvent.setup();

		await user.click(showMore);

		expect(screen.getByText(/less/i)).toBeInTheDocument();
	});
});
