import { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { RiAddCircleFill } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import { DynamicData } from '../../../@types/DynamicData';
import { SellerProductsModal } from '../../../components/cards/SellerProductsModal';
import '../../../index.css';
import { getProducts } from '../../../redux/features/productSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';

const SellerProductsPage = () => {
	const { isLoading } = useAppSelector((state) => state.product);
	const data = useAppSelector((state) => state.product.products) || [];

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (data && !data.length) {
			dispatch(getProducts()).unwrap();
		}
	}, [dispatch, data]);

	const [openModels, setOpenModels] = useState<{ [key: number]: boolean }>({});
	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 10;

	const productArray = Array.isArray(data) ? data : [];
	const offset = currentPage * itemsPerPage;
	const currentItems = productArray.slice(offset, offset + itemsPerPage);
	const pageCount = Math.ceil(productArray.length / itemsPerPage);

	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};

	const toggleItemModel = (idx: number) => {
		setOpenModels((prev) => ({
			...prev,
			[idx]: !prev[idx],
		}));
	};

	return (
		<>
			<div className="parent_container relative max-h-[80%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-full">
				{isLoading ? (
					<div className="w-full absolute h-full flex items-center justify-center">
						<ScaleLoader
							color="#256490"
							role="progressbar"
							aria-label="single_product_loder"
						/>
					</div>
				) : (
					<>
						<div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-10 bg-neutral-white p-4 rounded-md max-w-[95%]">
							<div className="flex justify-between items-center">
								<h1 className="mb-5">Products</h1>
								<Link to={'new'}>
									<button className="md:mx-3 px-4 py-1 laptop:py-2 text-neutral-white font-semibold text-white rounded-lg flex items-center space-x-2 bg-custom-gradient">
										<span>Add new</span>
										<RiAddCircleFill className="text-xl" />
									</button>
								</Link>
							</div>
							<>
								<table className="tables pt-2 p-3 overflow-hidden overflow-x-scroll max-w-[18rem] tablet:max-w-[100%]">
									<thead className="bg-[#256490] text-neutral-white text-left overflow-hidden rounded-3xl p2">
										<tr className="rounded-xl text-sm">
											<th className="">Image</th>
											<th>Name</th>
											<th>Category</th>
											<th>Quantity</th>
											<th>Discount</th>
											<th>Price</th>
											<th className="expand">Action</th>
										</tr>
									</thead>
									<tbody className="text-slate-700">
										{currentItems.map((item: DynamicData, idx: number) => (
											<tr
												key={idx}
												className={`relative text-sm ${idx % 2 !== 0 ? 'bg-[#DDDD]' : ''}`}
											>
												<td className="w-20 h-16">
													<img
														src={item?.images[0]}
														alt="product_images"
														className="w-full h-full object-cover rounded-lg"
													/>
												</td>
												<td className=" text-sm">
													{item?.name?.length > 20
														? item.name.slice(0, 20) + '...'
														: item.name}
												</td>
												<td>{item?.category?.name}</td>
												<td>{item?.quantity}</td>
												<td>{item?.discount}</td>
												<td>{item?.price}</td>
												<td className="cursor-pointer ">
													<BsThreeDotsVertical
														onClick={() => toggleItemModel(idx)}
														aria-label="toggle_modal"
													/>
													{openModels[idx] && (
														<SellerProductsModal
															id={item.id}
															idx={idx}
															item={item}
															state={item}
															handleToggle={toggleItemModel}
														/>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						</div>
						<div className="flex items-center justify-center">
							<ReactPaginate
								previousLabel={<GrPrevious />}
								nextLabel={<GrNext />}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={handlePageClick}
								containerClassName={'pagination'}
								activeClassName={'active'}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SellerProductsPage;
