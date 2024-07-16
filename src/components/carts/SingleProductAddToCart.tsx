import { FC, useEffect, useState } from 'react';
import { FaCartPlus, FaMinus, FaPlus } from 'react-icons/fa';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { cartQuantities, getCarts } from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { ButtonIcon } from '../buttons/ButtonIcon';

interface SinglePageAddToCartProps {
	productId: string;
}

const SinglePageAddToCart: FC<SinglePageAddToCartProps> = ({ productId }) => {
	const { carts } = useAppSelector((state) => state.cart);
	const [quantity, setQuantity] = useState<number>(0);
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();

	useEffect(() => {
		dispatch(getCarts()).unwrap();
	}, [dispatch]);

	useEffect(() => {
		const productInCart = carts?.products?.find(
			(product: DynamicData) => product.id === productId,
		);

		if (productInCart) {
			setQuantity(productInCart.quantity);
		}
	}, [carts, productId]);

	const handleAddQuantity = () => {
		setQuantity(quantity + 1);
	};

	const handleSubtractQuantity = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = async () => {
		try {
			await dispatch(
				cartQuantities({
					productId,
					quantity,
				}),
			).unwrap();
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
		<div className="action flex justify-between gap-3">
			<div className="quantity flex flex-col gap-2">
				<h1>Quantity</h1>
				<div className="buttons flex gap-3">
					<button
						data-testid="decrement-button"
						onClick={handleSubtractQuantity}
					>
						<FaMinus className="p-1 rounded-full text-2xl border-2 border-primary-lightblue cursor-pointer" />
					</button>
					<span data-testid="quantity-display">{quantity}</span>
					<button data-testid="increment-button" onClick={handleAddQuantity}>
						<FaPlus className="bg-primary-lightblue p-1 rounded-full text-2xl border-2 border-primary-lightblue text-neutral-white cursor-pointer" />
					</button>
				</div>
			</div>
			<div className="add_to_cart flex items-center">
				<ButtonIcon
					data-testid="add-to-cart-button"
					disabled={quantity === 0}
					onClick={handleAddToCart}
				>
					<FaCartPlus /> Add to cart
				</ButtonIcon>
			</div>
		</div>
	);
};

export default SinglePageAddToCart;
