import { FC } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import {
	cartQuantities,
	isProductInCart,
} from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

interface ProductPageAddToCartProps {
	productId: string;
}

const ProductPageAddToCart: FC<ProductPageAddToCartProps> = ({ productId }) => {
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const InCartchangeColor = useAppSelector((state) =>
		isProductInCart(state, productId),
	);

	const handleAddToCart = async (productId: string) => {
		try {
			await dispatch(cartQuantities({ productId, quantity: 1 })).unwrap();
			showSuccessMessage('Added to cart successfully');
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	return (
		<div
			data-testid={`add-to-cart-${productId}`}
			onClick={() => handleAddToCart(productId)}
			className={`cart_icon cart_btn absolute right-3 bottom-3 text-neutral-white p-2 text-2xl rounded-full flex items-center justify-center ${
				InCartchangeColor
					? 'bg-action-success cursor-not-allowed pointer-events-none'
					: 'bg-primary-lightblue cursor-pointer pointer-events-auto'
			}`}
		>
			<FaCartPlus />
		</div>
	);
};

export default ProductPageAddToCart;
