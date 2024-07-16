import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import IconLoader from '../../../src/components/Loaders/IconLoader';

describe('IconLoader component', () => {
	it('should render an svg with applied styles', () => {
		render(<IconLoader className="animate-spin" />);
		const svgElement = document.querySelector('svg');
		expect(svgElement).toBeInTheDocument();
		expect(svgElement).toHaveClass('animate-spin');
	});
});
