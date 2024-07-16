import { useEffect } from 'react';
interface ScrollBarRemoveProps {
	isVisible: boolean;
	children: React.ReactNode;
}
function UseScrollBarRemove({ isVisible, children }: ScrollBarRemoveProps) {
	useEffect(() => {
		if (isVisible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isVisible]);
	return <div>{children}</div>;
}

export default UseScrollBarRemove;
