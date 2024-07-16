import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoogleButton from '../../../src/components/buttons/GoogleButton';
const baseurl = `${import.meta.env.VITE_API_BASE_URL}`;

describe('GoogleButton', () => {
	it('should render a google button', () => {
		render(<GoogleButton />);
		const button = screen.getByRole('button', {
			name: /continue with google/i,
		});
		expect(button).toBeInTheDocument();
	});

	it('renders the button with the Google icon and text', () => {
		render(<GoogleButton />);

		const button = screen.getByRole('button', {
			name: /continue with google/i,
		});
		const icon = screen.getByAltText('Google icon');

		expect(button).toBeInTheDocument();
		expect(icon).toBeInTheDocument();
	});

	it('redirects to Google login URL when clicked', () => {
		render(<GoogleButton />);

		const button = screen.getByRole('button', {
			name: /continue with google/i,
		});

		// Create a mock for window.location.assign
		const originalLocation = window.location;
		delete (window as any).location;
		window.location = {
			...originalLocation,
			assign: vi.fn(),
		};

		fireEvent.click(button);

		expect(window.location.href).toBe(`${baseurl}/users/auth/google`);
	});
});
