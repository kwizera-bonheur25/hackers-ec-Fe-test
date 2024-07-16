import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RegisterLoginContainer from '../../../src/components/Layouts/RegisterLoginContainer';

describe('RegisterLoginContainer component', () => {
	it('should render a children passed in the document', () => {
		render(
			<RegisterLoginContainer>
				<div>Hello world</div>
			</RegisterLoginContainer>,
		);
		expect(screen.getByText('Hello world')).toBeInTheDocument();
	});
});
