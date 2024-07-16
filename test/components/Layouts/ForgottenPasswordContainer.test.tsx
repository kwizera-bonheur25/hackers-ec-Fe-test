import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ForgottonPasswordContainer from '../../../src/components/Layouts/ForgottonPasswordContainer';

describe('ForgottonPasswordContainer component', () => {
	it('should render a children passed in the document"', () => {
		render(
			<ForgottonPasswordContainer>
				<div>Forgotten Form</div>
			</ForgottonPasswordContainer>,
		);

		const logoImage = screen.getByAltText('ShopTrove logo');
		expect(logoImage).toBeInTheDocument();

		const title = screen.getByText('Enter your email');
		expect(title).toBeInTheDocument();
	});
});
