import { MemoryRouter } from 'react-router-dom';
import SideBarItem from '../../../src/components/cards/SideBarItem';
import { fireEvent, render } from '@testing-library/react';
import { Menu } from 'lucide-react';

describe('SideBarItem component', () => {
	const mocketActive = vi.fn();

	beforeEach(() => {
		mocketActive.mockClear();
	});

	it('renders with correct classes when active', () => {
		const { getByText } = render(
			<MemoryRouter>
				<SideBarItem
					icon={<Menu />}
					link="/dashboard"
					text="Dashboard"
					active={true}
					setActive={mocketActive}
				/>
			</MemoryRouter>,
		);

		const linkElement = getByText('Dashboard');
		fireEvent.click(linkElement);

		expect(mocketActive).toHaveBeenCalledWith('Dashboard');
	});
});
