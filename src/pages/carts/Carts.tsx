import { useEffect } from 'react';
import CartIsEmpty from '../../components/carts/CartIsEmpty';
import CartPage from '../../components/carts/CartPage';
import CartPageLoader from '../../components/carts/CartPageLoader';
import { getCarts } from '../../redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';

const Cart = () => {
	const dispatch = useAppDispatch();
	const { numberOfItem, isInitialLoading } = useAppSelector(
		(state) => state.cart,
	);

	useEffect(() => {
		dispatch(getCarts()).unwrap();
	}, [dispatch]);

	return (
		<>
			{isInitialLoading ? (
				<CartPageLoader />
			) : numberOfItem === 0 ? (
				<CartIsEmpty />
			) : (
				<CartPage />
			)}
		</>
	);
};

export default Cart;
