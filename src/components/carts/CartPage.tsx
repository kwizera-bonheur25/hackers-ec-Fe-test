import { DynamicData } from '../../@types/DynamicData';
import CartQuantity from '../../components/buttons/CartQuantity';
import RemoveCartButton from '../../components/buttons/RemoveCart';
import { useAppSelector } from '../../redux/hooks/hooks';

const CartPage = () => {
	const { carts, numberOfItem } = useAppSelector((state) => state.cart);

	return (
		<>
			<div className="grid grid-cols-1 ipad:grid-cols-2 gap-4 ipad:gap-8 mt-16 tablet:mt-24 ipad:mt-36 h-full bg-neutral-white px-5 py-10">
				<div className="bg-neutral-greyLight rounded-xl p-6 flex flex-col justify-center ipad:order-1">
					<div className="bg-inputBg rounded-xl p-5 text-sm mb-3">
						<div className="mb-7 py-2">
							<div className="flex justify-between gap-1 mb-3">
								<p>Number of Items:</p>
								<p>{numberOfItem} items</p>
							</div>
							<div className="flex justify-between">
								<p>Total price:</p>
								<p>
									<span>{carts?.total}</span> Rwf
								</p>
							</div>
						</div>
						<button className="bg-action-success py-2 px-3 mobile:py-3 rounded-3xl text-neutral-white w-full text-sm hover:bg-action-success/90">
							Checkout ( <span>{carts?.total}</span> Rwf )
						</button>
					</div>
				</div>
				<div className="bg-neutral-greyLight p-5 rounded-3xl">
					<div className="mt-4">
						<h1 className="font-semibold text-base text-center text-primary-lightblue ipad:text-2xl ipad:text-left">
							The Checkout Hub: Your Cart
						</h1>
						<hr className="text-primary-lightblue/45 my-3" />
					</div>

					<div className="overflow-y-scroll h-[34rem] space-y-10 ">
						{Array.isArray(carts?.products) &&
							carts?.products?.map((item: DynamicData, idx: number) => (
								<div
									key={idx}
									className="bg-inputBg grid grid-cols-1 mr-4 py-5 px-[0.6rem] gap-4 ipad:gap-0 ipad:px-0 ipad:py-1.5 ipad:flex items-center justify-between rounded-2xl "
								>
									<div className="flex justify-between p-3 gap-5 ipad:gap-3 items-center">
										<div className="rounded-md  h-[112px] w-[112px]  ipad:w-[130px] ipad:h-[120px] laptop:w-[170px] laptop:h-[150px] overflow-hidden">
											<img
												className="mobile:w-full w-full h-full object-cover"
												src={item.image}
												alt={item.name}
											/>
										</div>
										<div className="text-xs flex-1">
											<h2 className="font-semibold mb-2 mobile:text-lg ipad:text-sm">
												{item.name}
											</h2>
											<div className="flex gap-1 mb-2 mobile:my-5 ipad:my-4">
												<p className="text-xs mobile:text-sm ipad:text-xs">
													price:
												</p>
												<p className="text-xs mobile:text-sm ipad:text-xs">
													{item.price} Rwf
												</p>
											</div>
											<div className="flex items-center gap-4">
												<CartQuantity productId={item.id} />
											</div>
										</div>
									</div>
									<div className="ipad:w-[20%] px-1 ipad:pr-3">
										<RemoveCartButton productId={item.id} />
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default CartPage;
