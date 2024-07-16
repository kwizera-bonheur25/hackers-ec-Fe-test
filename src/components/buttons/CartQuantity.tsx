import { useEffect, useState } from 'react';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { cartQuantities } from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

interface CartQuantityProps {
	productId: string;
}

const CartQuantity = ({ productId }: CartQuantityProps) => {
	const { showErrorMessage } = useToast();
	const dispatch = useAppDispatch();
	const { carts } = useAppSelector((state) => state.cart);
	const [quantity, setQuantity] = useState<number>(0);

	useEffect(() => {
		const productInCart = carts?.products?.find(
			(product: DynamicData) => product.id === productId,
		);
		if (productInCart) {
			setQuantity(productInCart.quantity);
		}
	}, [carts, productId]);

	const handleAddQuantity = async () => {
		try {
			await dispatch(
				cartQuantities({ productId, quantity: quantity + 1 }),
			).unwrap();
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	const handleSubtractQuantity = async () => {
		if (quantity > 1) {
			try {
				await dispatch(
					cartQuantities({ productId, quantity: quantity - 1 }),
				).unwrap();
			} catch (e) {
				const err = e as DynamicData;
				showErrorMessage(
					err?.data?.message ||
						err?.message ||
						'Unknown error occurred! Please try again!',
				);
			}
		}
	};

	return (
		<div className="flex items-center gap-2">
			<button
				onClick={handleSubtractQuantity}
				className="border-2 border-primary-lightblue p-2 rounded-full flex items-center justify-center w-6 h-6 cursor-pointer"
			>
				<span className="text-xl text-primary-lightblue">-</span>
			</button>
			<span>{quantity}</span>
			<button
				onClick={handleAddQuantity}
				className="border-2 border-primary-lightblue ipad:text-3xl bg-primary-lightblue p-2 rounded-full flex items-center justify-center w-6 h-6 cursor-pointer"
			>
				<span className="text-xl text-neutral-white">+</span>
			</button>
		</div>
	);
};

export default CartQuantity;
