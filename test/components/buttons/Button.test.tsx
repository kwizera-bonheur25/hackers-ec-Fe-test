import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Button from '../../../src/components/buttons/Button';

describe('Button commponent', () => {
	it('should render a button with a title', () => {
		render(
			<Button
				url={null}
				buttonType="button"
				title={'Click me'}
				otherStyles="px-2"
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('should render a link button when url is provide and button', () => {
		render(
			<Button
				url={'/home'}
				buttonType="button"
				title={'Go Home'}
				otherStyles="px-2"
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		const linkElement = screen.getByRole('link', { name: /go home/i });
		expect(linkElement).toHaveAttribute('href', '/home');
	});

	it('should not render a link when url is null', () => {
		render(
			<Button
				url={null}
				buttonType="button"
				title={'Go home'}
				otherStyles="px-2"
			/>,
			{
				wrapper: BrowserRouter,
			},
		);

		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});
});
