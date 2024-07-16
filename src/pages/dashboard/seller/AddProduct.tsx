import { useLocation } from 'react-router-dom';
import AddProductForm from '../../../components/Forms/AddProductForm';

const AddProduct = () => {
	const location = useLocation();
	const data = location.state;

	return (
		<div className="p-5 w-full h-full">
			<h1 className="w-full text-2xl font-semibold mb-1">
				{data ? 'Update Product' : 'Add product'}
			</h1>
			<AddProductForm />
		</div>
	);
};

export default AddProduct;
