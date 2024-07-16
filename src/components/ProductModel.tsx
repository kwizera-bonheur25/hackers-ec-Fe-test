import { ShoppingBasket } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface ModalProps {
	openModel: boolean;
	toggleModel: () => void;
}

const ProductModel: React.FC<ModalProps> = ({ openModel, toggleModel }) => {
	return (
		<>
			{openModel && (
				<div className="">
					<div className="view_product" onClick={toggleModel}>
						<ShoppingBasket /> vew product
					</div>
					<div className="edit_product" onClick={toggleModel}>
						<FaEdit /> edit product
					</div>
					<div className="delete_product" onClick={toggleModel}>
						<MdDelete /> delete product
					</div>
				</div>
			)}
		</>
	);
};

export default ProductModel;
