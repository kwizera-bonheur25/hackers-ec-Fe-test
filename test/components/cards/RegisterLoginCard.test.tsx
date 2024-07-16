import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import RegisterLoginCard from '../../../src/components/cards/RegisterLoginCard';

describe('RegisterLoginCard component', () => {
	it('should render a card with right props provided', () => {
		render(
			<RegisterLoginCard
				cardTitle="Welcome"
				navDescription="Dont have an account"
				buttonTitle="REGISTER"
				buttonUrl="/register"
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		const button = screen.getByRole('button', { name: /register/i });
		const linkElement = screen.getByRole('link');

		expect(button).toBeInTheDocument();
		expect(linkElement).toHaveAttribute('href', '/register');
		expect(screen.getByText(/welcome/i)).toBeInTheDocument();
		expect(screen.getByText(/account/i)).toBeInTheDocument();
	});
});
