import React, { ChangeEvent, useEffect, useRef } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { uploadImage } from '../../utils/images';

interface ImageDropZoneProps {
	onDrop: (files: FileList) => void;
	handleOnChange?: (e: ChangeEvent) => void;
}

const ImageDropZone: React.FC<ImageDropZoneProps> = ({
	onDrop,
	handleOnChange,
}) => {
	const dropRef = useRef<HTMLDivElement | null>(null);

	const [{ isOver }, drop] = useDrop({
		accept: 'image/*',
		drop: (monitor: DropTargetMonitor) => {
			if (monitor) {
				const files = monitor.getItem<{ files: FileList }>().files;
				onDrop(files);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	});

	useEffect(() => {
		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			if (e.dataTransfer?.files) {
				onDrop(e.dataTransfer.files);
			}
		};

		const handleDragOver = (e: DragEvent) => {
			e.preventDefault();
		};

		const dropArea = dropRef.current;
		if (dropArea) {
			dropArea.addEventListener('drop', handleDrop);
			dropArea.addEventListener('dragover', handleDragOver);
		}

		return () => {
			if (dropArea) {
				dropArea.removeEventListener('drop', handleDrop);
				dropArea.removeEventListener('dragover', handleDragOver);
			}
		};
	}, [onDrop]);

	return (
		<div
			ref={(node) => {
				drop(node);
				dropRef.current = node;
			}}
			className={`relative ipad:h-[20%] h-[100px] pb-3 ${isOver ? 'bg-action-success/35' : 'border-neutral-white'}`}
		>
			<div className="flex-center border border-dashed border-neutral-grey rounded-2xl h-full flex-col gap-3 w-full">
				<img src={uploadImage} alt="upload logo" width={24} />
				<p className="text-neutral-black/70">
					{isOver ? 'Release to drop' : 'Drag & drop images here'}
				</p>
			</div>
			<input
				type="file"
				multiple
				name="images"
				className="absolute w-full h-full top-0 left-0 opacity-0"
				onChange={handleOnChange}
				aria-label="image-input"
			/>
		</div>
	);
};

export default ImageDropZone;
