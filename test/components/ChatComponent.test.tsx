import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChatComponent from '../../src/components/chat/ChatComponent';
import AllProvider from '../Utils/AllProvider';

describe('Chat Components', () => {
	it('should render chat components', () => {
		render(
			<BrowserRouter>
				<ChatComponent />
			</BrowserRouter>,
		);

		const chatBubbleIcon = screen.getByTestId('chat-bubble-icon');
		expect(chatBubbleIcon).toBeInTheDocument();

		const closeIcon = screen.queryByTestId('close-icon');
		expect(closeIcon).toBeNull();
	});

	it('renders close icon when chatModal is open', () => {
		const { getByTestId } = render(
			<AllProvider>
				<ChatComponent />
			</AllProvider>,
		);

		const chatBubbleIcon = getByTestId('chat-bubble-icon');
		fireEvent.click(chatBubbleIcon);

		const closeIcon = getByTestId('close-icon');
		expect(closeIcon).toBeInTheDocument();

		const chatBubbleIconAfterOpen = screen.queryByTestId('chat-bubble-icon');
		expect(chatBubbleIconAfterOpen).toBeNull();
	});
});
