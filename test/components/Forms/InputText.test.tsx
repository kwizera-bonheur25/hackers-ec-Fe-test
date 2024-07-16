import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FormInput from '../../../src/components/Forms/InputText';
import { FieldError } from 'react-hook-form';

describe('FormInput Component', () => {
	it('renders the input with given placeholder', () => {
		render(<FormInput type="text" placeholder="name" otherStyles="px-2" />);
		const inputElement = screen.getByPlaceholderText('name');
		expect(inputElement).toBeInTheDocument();
	});

	it('should applies the correct width class when width is provided', () => {
		render(
			<FormInput
				type="text"
				placeholder="name"
				width="w-1/2"
				otherStyles="px-2"
			/>,
		);

		const divElement = screen.getByPlaceholderText('name').parentElement;

		expect(divElement).toHaveClass('w-1/2');
	});

	it('should apply the default width class when width is not provided', () => {
		render(<FormInput type="text" placeholder="name" otherStyles="px-2" />);
		const divElement = screen.getByPlaceholderText('name').parentElement;
		expect(divElement).toHaveClass('flex-1');
	});

	it('should apply the correct style to the input', () => {
		render(<FormInput type="text" placeholder="name" otherStyles="px-2" />);
		const inputElement = screen.getByPlaceholderText('name');
		expect(inputElement).toHaveClass('px-2');
	});

	it('renders the input with correct attribute', () => {
		render(
			<FormInput
				type="password"
				placeholder="Enter password"
				otherStyles="px-2"
			/>,
		);
		const inputElement = screen.getByPlaceholderText('Enter password');
		expect(inputElement).toHaveAttribute('type', 'password');
	});

	it('renders error message when error prop is passed', () => {
		const error: FieldError = { message: 'Test error message', type: 'test' };
		render(<FormInput type="text" placeholder="Test" error={error} />);

		expect(screen.getByText('Test error message')).toBeInTheDocument();
	});

	it('applies default error styles when no custom styles are provided', () => {
		const error: FieldError = {
			message: 'Default styled error message',
			type: 'test',
		};
		render(<FormInput type="text" placeholder="Test" error={error} />);

		const errorMessage = screen.getByText('Default styled error message');
		expect(errorMessage).toHaveClass('text-[0.5rem]');
		expect(errorMessage).toHaveClass('px-2');
	});
});
