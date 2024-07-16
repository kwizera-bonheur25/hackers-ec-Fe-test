/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { userType } from '../../@types/userType';
import { getRoles } from '../../redux/features/getRolesSlice';
import { roleType } from '../../@types/roleTypes';
import { DynamicData } from '../../@types/DynamicData';
import { GrNext, GrPrevious } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import { getUser } from '../../redux/features/getUserSlice';
import { HashLoader } from 'react-spinners';

interface getUserType {
	arrow?: ReactNode;
	searchIcon?: ReactNode;
}
const GetUser = (props: getUserType) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [butOverlay, setButOverlay] = useState('');
	const roles = useAppSelector((state) => state.allRoles?.data[0]);
	const roleLoading = useAppSelector((state) => state.allRoles.isLoading);
	const { isLoading, data } = useAppSelector((state) => state.allUsers);
	const pathname = window.location.pathname;
	const dispatch = useAppDispatch();
	const itemsPerPage = 8;

	useEffect(() => {
		if (!roles) {
			dispatch(getRoles()).unwrap();
		}
	}, [dispatch]);

	useEffect(() => {
		setCurrentPage(0);
	}, [searchQuery]);

	useEffect(() => {
		if (data.length === 0) {
			dispatch(getUser()).unwrap();
		}
	}, [dispatch]);

	const getRoleName = (roleId: string) => {
		return roles?.data.find((role: roleType) => role.id === roleId).roleName;
	};
	const handleOverlay = (userId: string) => {
		setButOverlay(userId === butOverlay ? '' : userId);
	};
	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};
	const offset = currentPage * itemsPerPage;
	const currentItems = data[data.length - 1]?.data
		.filter((user: DynamicData) =>
			user.email.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.slice(offset, offset + itemsPerPage);
	let pageCount = 0;
	if (data[0]?.data?.length) {
		pageCount = Math.ceil(data[0]?.data?.length / itemsPerPage);
	}
	const handlePageClick = (event: { selected: number }) => {
		setCurrentPage(event.selected);
	};
	const handleButOverlayApp = () => {
		if (butOverlay) {
			setButOverlay('');
		}
	};

	return (
		<div className="relative w-full ipad:w-[93%] ipad:m-auto  shadow-2xl  rounded-2xl flex flex-col h-full ipad:h-[90%] ipad:pt-6  ">
			{isLoading && roleLoading ? (
				<div
					className="flex-1 h-full flex-center flex-col gap-4"
					data-testid="get-user-table-id"
				>
					<HashLoader color="#266491" size={60} role="progressbar" />
					<p className="text-xs">Please wait ...</p>
				</div>
			) : (
				<div
					className="relative ipad:flex ipad:flex-col ipad:gap-1  ipad:h-full"
					onClick={handleButOverlayApp}
				>
					<div className="head h-[8%]  flex p-4 items-center ipad:hidden">
						<span className="text-xs flex-none text-primary-lightblue text-[1.3rem]">
							{props.arrow}
						</span>
						<p className=" text-center  px-[25%]  text-primary-lightblue font-bold text-[20px] mobile:flex-1 ">
							All Users
						</p>
					</div>

					<div className="py-1 w-full flex items-center justify-center">
						<form className="search   w-[80%]  flex border  items-center rounded-xl  py-1 px-[2%] overflow-hidden mobile:max-w-[19rem]  ">
							<p className="text-[29px] flex-none ">{props.searchIcon}</p>
							<input
								type="text"
								className=" w-[90%] focus:outline-none px-[13%] placeholder-neutral-black"
								placeholder="Search by email"
								onChange={handleSearch}
							/>
						</form>
					</div>

					<div className="div-table  w-full   overflow-x-auto    ipad:pt-1   ">
						<table className=" table-fixed rounded-3xl m-auto shadow-xl  ipad:mt-2 ">
							<thead className=" w-full text-neutral-white ">
								<tr>
									<th className=" bg-primary-lightblue px-[3rem] mobile:px-[2rem] py-3 rounded-l-lg  ipad:px-[1.5rem] ">
										No
									</th>
									<th className=" bg-primary-lightblue   px-[3rem]  py-3 ipad:px-[1rem]">
										Firstname
									</th>
									<th className="  bg-primary-lightblue px-[3rem]  py-3  ipad:px-[1rem]">
										Lastname
									</th>
									<th className="  bg-primary-lightblue  px-[3rem]  py-3 ipad:px-[1rem]">
										Email
									</th>
									<th className="  bg-primary-lightblue  px-[3rem] mobile:px-[1.5rem] py-3">
										Active
									</th>
									<th className="  bg-primary-lightblue  px-[3rem] mobile:px-[3rem] py-3 ipad:px-[2.5rem]">
										Role
									</th>
									<th className="  bg-primary-lightblue  px-[3rem] mobile:px-[3rem] py-3  rounded-r-lg  ipad:px-[1rem] ">
										Action
									</th>
								</tr>
							</thead>

							<tbody className=" text-center rounded-3xl">
								{currentItems && currentItems.length > 0 ? (
									currentItems.map((item: userType, index: number) => (
										<tr
											key={item?.id}
											className={`${index % 2 !== 0 ? 'bg-neutral-white' : 'bg-overlay bg-opacity-15'}`}
										>
											<td className=" py-3">{index + 1 + offset}</td>
											<td className="pl-[3rem] ipad:pl-[1rem] text-left">
												{item?.firstName}
											</td>
											<td className=" pl-[3rem] ipad:pl-[1rem] text-left">
												{' '}
												{item?.lastName}
											</td>
											<td className="ipad:pl-[1rem] pl-[3rem] text-left">
												{item?.email}
											</td>
											<td>
												{' '}
												{item?.isActive === true ? 'active' : 'unactive'}
											</td>
											<td> {getRoleName(item.role as string)}</td>
											<td>
												{' '}
												<div className="relative">
													<button
														type="button"
														onClick={() => {
															handleOverlay(item?.id as string);
														}}
														data-testid="dots-button"
													>
														<IoMdMore />
													</button>
													{butOverlay === item.id && (
														<div
															className={` absolute h-[6rem] w-[15rem]  rounded  shadow-2xl  left-20 z-[900] bg-neutral-white px-4 flex flex-col gap-4 tablet:-left-40 py-2 
															${index + 1 >= currentItems.length - 1 ? 'bottom-0 ' : 'left-20'}
														`}
														>
															<Link to="" className="">
																<div className="text-[26px] flex text-center items-center gap-4  bg-neutral-grey px-2 py-1 rounded-xl bg-opacity-35 hover:bg-opacity-70">
																	<FaUserCircle />
																	<p className="text-[17px] fontp">
																		view user details
																	</p>
																</div>
															</Link>
															<Link
																to={`/dashboard/roles/${item.id}`}
																className=""
															>
																<div className="text-[26px] flex text-center items-center gap-4  px-2 py-1 rounded-xl bg-neutral-grey bg-opacity-35 hover:bg-opacity-70">
																	<FaEdit />
																	<p className="text-[17px]">Edit roles</p>
																</div>
															</Link>
														</div>
													)}
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={7}
											className="py-4 text-center text-neutral-black"
										>
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-center flex-row">
						<ReactPaginate
							previousLabel={<GrPrevious />}
							nextLabel={<GrNext />}
							breakLabel={'...'}
							breakClassName={'break-me'}
							pageCount={pageCount}
							marginPagesDisplayed={2}
							pageRangeDisplayed={2}
							onPageChange={handlePageClick}
							containerClassName={'pagination'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			)}
			{pathname.includes('/dashboard/Roles') ? (
				<div className="blueOverlay absolute w-full h-full bg-opacity-60 blur-sm top-0 shadow-2xl z-[100] bg-primary-lightblue "></div>
			) : (
				false
			)}
		</div>
	);
};

export default GetUser;
