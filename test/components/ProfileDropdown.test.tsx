import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ProfileDropdown from '../../src/components/ProfileDropdown';
import AllProvider from '../Utils/AllProvider';
describe('profile DropDown component', () => {
	it('render Profile DropDown component', async () => {
		const { img, dropDownbtn } = renderComponents();
		const downToggle = userEvent.setup();
		await downToggle.click(dropDownbtn);
		expect(screen.getByText('Profile')).toBeInTheDocument();
		expect(img).toBeInTheDocument();
		expect(dropDownbtn).toBeInTheDocument();
	});
});

const renderComponents = () => {
	render(<ProfileDropdown image="" />, { wrapper: AllProvider });

	return {
		img: screen.getByAltText('User Profile'),
		dropDownbtn: screen.getByRole('button'),
	};
};
