import { render, screen } from '@testing-library/react';
import ChatRedirections from '../../../src/components/Redirection/ChatRedirections';
import { BrowserRouter } from 'react-router-dom';

describe('Chat redirects when you are not logged in', () => {
	it('should render chat redirections components', () => {
		render(
			<BrowserRouter>
				<ChatRedirections />
			</BrowserRouter>,
		);
		expect(screen.getAllByText(/Welcome!/i));
	});
});
