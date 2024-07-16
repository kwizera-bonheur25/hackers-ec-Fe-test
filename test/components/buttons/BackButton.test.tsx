import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BackButton from '../../../src/components/buttons/BackButton';

describe('BackButton component', () => {
	it('should render a back button with', () => {
		render(<BackButton isBordered title={'Back'} />, {
			wrapper: BrowserRouter,
		});

		const button = screen.getByRole('button', { name: /back/i });
		expect(button).toBeInTheDocument();
	});
});
