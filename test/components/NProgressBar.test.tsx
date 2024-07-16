import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';
import NProgressBar from '../../src/utils/NProgressBar';
import NProgress from 'nprogress';

vi.mock('nprogress', async (importOriginal) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const actual: any = await importOriginal();
	return {
		...actual,
		default: {
			...actual.default,
			start: vi.fn(),
			done: vi.fn(),
		},
	};
});

describe('NProgressBar component', () => {
	it('calls NProgress start and done on mount', () => {
		render(
			<BrowserRouter>
				<NProgressBar>
					<div>Test Child</div>
				</NProgressBar>
			</BrowserRouter>,
		);

		expect(NProgress.start).toHaveBeenCalled();
		expect(NProgress.done).toHaveBeenCalled();

		expect(screen.getByText('Test Child')).toBeInTheDocument();
	});
});
