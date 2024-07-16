import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it, expect, describe } from 'vitest';
import NotFound from '../../src/pages/NotFound';

describe('NotFound page', () => {
	it('should shout render a not found page', () => {
		render(
			<MemoryRouter>
				<NotFound />
			</MemoryRouter>,
		);

		expect(screen.getByText(/not found/i));
	});
});
