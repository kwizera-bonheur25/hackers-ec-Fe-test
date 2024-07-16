import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LandingModel from '../../src/components/LandingPageModel';
import AllProvider from '../Utils/AllProvider';
import { toggleModel } from '../../src/redux/features/navSlice';
describe('LandingPageModel component', () => {
	it('render LandingPageModel component', async () => {
		const { searchField } = renderComponents();
		expect(searchField).toBeInTheDocument();
	});
});

const renderComponents = () => {
	const openModel = true;
	render(<LandingModel toggleModel={toggleModel} openModel={openModel} />, {
		wrapper: AllProvider,
	});

	return {
		searchField: screen.getByPlaceholderText('Search ...'),
	};
};
