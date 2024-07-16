import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ImageDropZone from '../../../src/components/cards/ImageDropZone';

describe('ImageDropZone', () => {
	const renderWithDndProvider = (ui: React.ReactElement) => {
		return render(<DndProvider backend={HTML5Backend}>{ui}</DndProvider>);
	};

	it('renders correctly', () => {
		const { getByText, getByAltText } = renderWithDndProvider(
			<ImageDropZone onDrop={() => {}} />,
		);

		expect(getByText('Drag & drop images here')).toBeInTheDocument();
		expect(getByAltText('upload logo')).toBeInTheDocument();
	});
});
