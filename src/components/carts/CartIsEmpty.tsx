import BackButton from '../../components/buttons/BackButton';
import { emptyCart } from '../../utils/images';
const CartIsEmpty = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center ">
			<div className="flex flex-col items-center space-y-5">
				<div>
					<img
						src={emptyCart}
						alt="empty cart icon"
						className="text-action-error"
					/>
				</div>
				<h2 className="text-center font-bold text-2xl">Your Cart Is Empty</h2>
				<p className="text-center">
					Look like you haven't made your choice yet.
				</p>
				<BackButton
					otherStyles="transition duration-100 ease-in-out bg-custom-gradient hover:scale-105 text-neutral-white button-size  rounded-full "
					isBordered
					url="/products"
					title="Start Shopping"
				/>
			</div>
		</div>
	);
};

export default CartIsEmpty;
