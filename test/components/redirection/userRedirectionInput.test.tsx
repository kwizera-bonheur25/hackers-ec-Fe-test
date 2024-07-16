import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserRedirectionInput from '../../../src/components/redirections/UserRedirectionInput';

describe('UserRedirectionInput Component', () => {
	it('renders the text correctly', () => {
		const text = 'This is a message';
		render(<UserRedirectionInput text={text} />);
		expect(screen.getByText(text)).toBeInTheDocument();
	});

	it('applies additional styles correctly', () => {
		const text = 'Styled text';
		const otherStyles = 'text-blue-500 font-bold';
		render(<UserRedirectionInput text={text} otherStyles={otherStyles} />);
		const element = screen.getByText(text);
		expect(element).toHaveClass(otherStyles);
	});
});
