import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { removeCarts } from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

interface RemoveCartProps {
	productId: string;
}

const RemoveCartButton = ({ productId }: RemoveCartProps) => {
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { isLoading } = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const handleClick = async () => {
		try {
			await dispatch(removeCarts(productId)).unwrap();
			showSuccessMessage('Cart successfully removed');
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};

	return (
		<>
			<button
				disabled={isLoading}
				onClick={handleClick}
				className="bg-neutral-darkRed py-2 flex items-center justify-center mobile:py-3 w-full rounded-3xl text-neutral-white ipad:py-2 hover:bg-neutral-darkRed/90 text-xs"
			>
				Remove
			</button>
		</>
	);
};

export default RemoveCartButton;
