import { ScaleLoader } from 'react-spinners';

const CartPageLoader = () => {
	return (
		<div className="bg-neutral-white h-screen">
			<div className="w-full h-full flex items-center justify-center absolute">
				<ScaleLoader color="#256490" role="progressbar" />
			</div>
		</div>
	);
};

export default CartPageLoader;
