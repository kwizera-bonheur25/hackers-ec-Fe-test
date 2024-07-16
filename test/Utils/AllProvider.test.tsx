import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AllProvider from './AllProvider';

describe('AllProvider', () => {
	it('renders children correctly', () => {
		const { getByText } = render(
			<AllProvider>
				<div>Test Content</div>
			</AllProvider>,
		);

		expect(getByText('Test Content')).toBeInTheDocument();
	});
});
