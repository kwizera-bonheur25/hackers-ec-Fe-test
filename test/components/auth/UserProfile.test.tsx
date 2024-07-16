import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Profile from '../../../src/pages/auth/Profile';
import AllProvider from '../../Utils/AllProvider';

describe('user profile update component', () => {
	it('render the update form', () => {
		const {
			firstnameInput,
			lastnameInput,
			emailInput,
			phonenumberInput,
			birthdateInput,
			language,
			country,
			city,
			primaryAddress,
			secondAddress,
			zipcode,
		} = renderComponents();

		expect(firstnameInput).toBeInTheDocument();
		expect(lastnameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(phonenumberInput).toBeInTheDocument();
		expect(birthdateInput).toBeInTheDocument();
		expect(language).toBeInTheDocument();
		expect(country).toBeInTheDocument();
		expect(city).toBeInTheDocument();
		expect(primaryAddress).toBeInTheDocument();
		expect(secondAddress).toBeInTheDocument();
		expect(zipcode).toBeInTheDocument();
	});
});

const renderComponents = () => {
	render(<Profile />, { wrapper: AllProvider });

	return {
		firstnameInput: screen.getByPlaceholderText('Ivy'),
		lastnameInput: screen.getByPlaceholderText('Jacky'),
		emailInput: screen.getByPlaceholderText('email@example.com'),
		phonenumberInput: screen.getByPlaceholderText('0780000000'),
		birthdateInput: screen.getByPlaceholderText('10/10/23'),
		language: screen.getByPlaceholderText('Swahili'),
		country: screen.getByPlaceholderText('Rwanda'),
		city: screen.getByPlaceholderText('Kigali'),
		primaryAddress: screen.getByPlaceholderText('Nyarugenge'),
		secondAddress: screen.getByPlaceholderText('Muhanga'),
		zipcode: screen.getByPlaceholderText('0000'),
	};
};
