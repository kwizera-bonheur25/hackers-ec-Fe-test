import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaCaretDown, FaHeart, FaStar } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../@types/DynamicData';
import { searchInputs } from '../@types/SearchType';
import depart_icon from '../assets/departments_icon.svg';
import Button from '../components/buttons/Button';
import ProductPageAddToCart from '../components/carts/ProductPageAddToCart';
import CategoryModel from '../components/CategoryModel';
import FormInput from '../components/Forms/InputText';
import { getProducts } from '../redux/features/productSlice';
import {
	getSearchedProducts,
	manipulateSearchInput,
	search,
} from '../redux/features/SearchSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import fetchInfo from '../utils/userDetails';

const LandingProduct = () => {
	const { isLoading, products } = useAppSelector((state) => state.product);
	const { data, searchInputs } = useAppSelector((state) => state.search);
	const [openModel, setOpenModel] = useState(false);
	const [openFilter, setOpenFilter] = useState(false);
	const dispatch = useAppDispatch();

	const toggleModel = () => {
		setOpenModel(!openModel);
	};

	const tokenInfo = fetchInfo();

	useEffect(() => {
		if (products && !products.length && tokenInfo) {
			dispatch(getProducts()).unwrap();
		}
	}, [dispatch, products]);

	useEffect(() => {
		dispatch(getSearchedProducts(products));
	}, [products, dispatch]);

	const HandleSearch = async (searchInput: searchInputs) => {
		dispatch(manipulateSearchInput(searchInput));
	};

	useEffect(() => {
		dispatch(search(searchInputs));
	}, [dispatch, searchInputs]);
	return (
		<>
			<div className="perent_products_container min-h-screen relative">
				{isLoading ? (
					<div className="w-full h-full flex items-center justify-center absolute">
						<ScaleLoader color="#256490" role="progressbar" />
					</div>
				) : (
					<div className="products_container flex flex-col items-center laptop:flex-row laptop:items-start pl-[5%] w-full mt-16 laptop:gap-5">
						<div className="departments cursor-pointer flex ipad:p-4 w-[100%] mobile:w-[100%] ipad:w-[40%] laptop:w-[28%]">
							<div className="depart_icon z-10 w-[60%] mobile:w-[50%] laptop:w-[90%] bg-primary-lightblue p-2 flex items-center h-12 justify-between gap-2 mt-6 rounded-t-md relative">
								<img src={depart_icon} alt="depart_icon" className="w-6 h-10" />
								<h1 className="text-md font-semibld text-neutral-white">
									{searchInputs.categoryName
										? searchInputs.categoryName
										: 'All categories'}
								</h1>
								<FaCaretDown
									className="text-3xl text-neutral-white"
									onClick={toggleModel}
								/>
								<CategoryModel
									setOpenModel={setOpenModel}
									openModel={openModel}
								/>
							</div>
						</div>

						<div className="mr-[5%] w-full">
							<div className=" mobile:relative absolute tablet:absolute laptop:relative w-full top-6 mobile:top-0 tablet:top-6 laptop:top-0  pr-[10%] mobile:pr-0 tablet:pr-[10%] laptop:pr-0 flex justify-end cursor-pointer">
								<div
									onClick={() => setOpenFilter(!openFilter)}
									className=" text-primary-lightblue py-1 w-[30%] h-12 mobile:h-8 tablet:h-12 laptop:h-10 mobile:w-[10%] tablet:w-[20%] laptop:w-[12%] right-0 flex items-center gap-2 justify-center rounded-md border-2 border-primary-lightblue"
								>
									{' '}
									<IoFilter color="#266491" size="20px" />
									<p className="text-md">Filters</p>
								</div>
							</div>
							{openFilter && (
								<motion.form
									initial={{ y: '100%', opacity: 1 }}
									animate={{ y: '0%' }}
									transition={{ ease: 'easeOut', duration: 1 }}
									className=" flex w-full gap-5 py-3"
								>
									<FormInput
										type="number"
										placeholder="Minimum price"
										otherStyles="h-12 rounded-md pl-3 primary-lightblue"
										value={`${searchInputs.minPrice && searchInputs.minPrice}`}
										onChange={(e) =>
											e.target.value
												? HandleSearch({ minPrice: e.target.value })
												: HandleSearch({ minPrice: null })
										}
									/>
									<FormInput
										type="number"
										placeholder="Maximum price"
										otherStyles="h-12 rounded-md pl-3 primary-lightblue"
										value={`${searchInputs.maxPrice && searchInputs.maxPrice}`}
										onChange={(e) =>
											e.target.value
												? HandleSearch({ maxPrice: e.target.value })
												: HandleSearch({ maxPrice: null })
										}
									/>
								</motion.form>
							)}
							<div
								className={` ${!data ? 'flex flex-1 justify-end items-center' : 'grid mobile:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-10'} product_card_container max-h-[95vh] overflow-hidden overflow-y-scroll h-full py-2 place-items-center`}
							>
								{Array.isArray(data) ? (
									data.slice(0, 8).map((item: DynamicData, idx: number) => (
										<div
											className="product_card bg-neutral-white p-4 flex flex-col rounded-md shadow laptop:max-w-[100%] h-full"
											key={idx}
										>
											<div className="card_profile p-2 w-full flex-grow">
												<div className="w-full h-48 relative">
													<div className="w-full overflow-hidden flex shadow h-48">
														<img
															src={item.images && item.images[0]}
															alt="card_profile"
															className="w-full h-full object-cover rounded-lg"
														/>
													</div>
													<ProductPageAddToCart productId={item.id} />
													{item.discount > 0 && (
														<div className="discount absolute p-1 rounded bg-action-warning text-neutral-white -right-2 -top-2 font-bold">
															{item.discount}%
														</div>
													)}
												</div>
											</div>
											<div className="card_description pl-2 flex-grow">
												<h1 className="py-2">
													{item.name.length > 20
														? item.name.slice(0, 20) + '...'
														: item.name}
												</h1>
												<div className="ratings flex">
													<span className="ml-2 flex items-center gap-2">
														<FaStar />
														{item.ratings} ratings
													</span>
												</div>
												<div className="price_wish flex justify-between items-center mt-2 gap-2 flex-wrap py-2">
													<h1 className="text-2xl font-bold">
														{item.price}
														<small className="text-base font-normal">
															{' '}
															RWF
														</small>
													</h1>
													<div className="wish flex items-center cursor-pointer">
														<span className="mr-1">add to wish</span>
														<FaHeart className=" text-action-error text-2xl cursor-pointer wish_btn" />
													</div>
												</div>
											</div>
											<div className="btn flex justify-center">
												<Button
													title="preview product"
													url={`/products/${item.id}`}
													otherStyles={
														' rounded-l-full rounded-r-full mt-2 font-semibold'
													}
													buttonType={'button'}
												/>
											</div>
										</div>
									))
								) : (
									<div className="w-full h-64 flex items-center justify-center">
										<div className=" text-primary-lightblue">
											<h1 className="text-xl text-center">No results found</h1>
											<p>
												It seems we can not find any results based on your
												search.
											</p>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default LandingProduct;
