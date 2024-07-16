/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShoppingBasket } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';
import { createContext, useState } from 'react';
import DeleteProduct from './DeleteProduct';

interface SellerModalProps {
	id: string;
	idx: number;
	item: DynamicData;
	state: DynamicData;
	handleToggle: (idx: number) => void;
}

export const modalContext = createContext({});
export const SellerProductsModal = ({
	id,
	idx,
	item,
	handleToggle,
}: SellerModalProps) => {
	const [modal, setModal] = useState(false);
	const changeModal = (_id: string) => {
		setModal(!modal);
	};
	return (
		<div className="absolute desktop:w-[15%] right-2 laptop:right-6 z-50 -top-10 flex p-2 rounded-lg shadow-md bg-[#fcfdfe] _shadow pt-5 pl-5">
			<div className="flex flex-col justify-between relative w-full">
				<div className="view_product flex gap-2 text-sm rounded-md p-1 a_link">
					<Link to={`/dashboard/products/${id}`} className="flex gap-2">
						<ShoppingBasket className="text-sm" /> Preview
					</Link>
				</div>
				<Link to={`/dashboard/products/edit/${id}`} state={item}>
					<div className="edit_product flex gap-2 text-sm rounded-md p-1 a_link">
						<FaEdit className="text-xl" /> Edit product
					</div>
				</Link>
				<div
					className="delete_product flex gap-2 text-sm rounded-md p-1 a_link "
					onClick={() => {
						changeModal(item.id);
					}}
				>
					<MdDelete className="text-xl text-action-error" /> Delete product
				</div>
				<IoClose
					className="absolute -right-2 -top-4 rounded-full bg-action-error  text-2xl"
					onClick={() => handleToggle(idx)}
				/>
			</div>
			{modal && (
				<modalContext.Provider value={{ changeModal }}>
					<DeleteProduct
						item={item}
						handleChange={() => changeModal(item.id)}
					/>
				</modalContext.Provider>
			)}
		</div>
	);
};
