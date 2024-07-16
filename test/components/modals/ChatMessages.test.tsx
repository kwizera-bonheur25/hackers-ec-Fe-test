import { render, screen } from '@testing-library/react';
import ChatMessages from '../../../src/components/chat/ChatMessages';
import AllProvider from '../../Utils/AllProvider';

describe('It should render the messages', () => {
	it('It should render the messages', () => {
		const message = {
			sender: {
				id: 'f988d56c-06c5-415f-91bb-ee394e5c3aac',
				firstName: 'Garrix',
				message: 'Hi',
			},
			message: 'Hello',
		};
		const userId = 'f988d56c-06c5-415f-91bb-ee394e5c3aac';

		render(
			<AllProvider>
				<ChatMessages index={1} message={message} id={userId} />
			</AllProvider>,
		);

		screen.debug();
		expect(screen.getByText(/hello/i)).toBeInTheDocument();
		if (message.sender.id !== userId) {
			expect(screen.getByText(/garrix/i)).toBeInTheDocument();
		}

		if (message.sender.id !== userId) {
			expect(screen.getByText(/garrix/i)).toBeInTheDocument();
		}
	});
});
