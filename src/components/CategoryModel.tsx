import { useEffect } from 'react';
import { fetchCategories } from '../redux/features/categorySlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { ScaleLoader } from 'react-spinners';
import { manipulateSearchInput, search } from '../redux/features/SearchSlice';

interface ModalProps {
	openModel: boolean;
	setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryModel: React.FC<ModalProps> = ({ openModel, setOpenModel }) => {
	const { isLoading, categories } = useAppSelector((state) => state.categories);
	const { searchInputs } = useAppSelector((state) => state.search);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (categories && !categories.length) {
			dispatch(fetchCategories()).unwrap();
		}
	}, [dispatch, categories]);

	const HandleSearch = async (categoryName: string | null) => {
		dispatch(manipulateSearchInput({ categoryName }));
	};

	useEffect(() => {
		searchInputs.categoryName && dispatch(search(searchInputs));
	}, [dispatch, searchInputs]);

	return (
		<>
			{isLoading ? (
				<div className="w-full h-full flex items-center justify-center absolute">
					<ScaleLoader role="progressbar" color="#256490" />
				</div>
			) : (
				<>
					{openModel && (
						<div
							onClick={() => setOpenModel(!openModel)}
							className=" absolute bg-[#eff4f8] flex flex-col top-12 right-0 z-10 w-full px-4 py-4 rounded-b-xl"
						>
							<span
								onClick={() => HandleSearch(null)}
								className="a_category a_link p-2 text-xl font-semibold text-primary-lightblue cursor-pointer"
							>
								All categories
							</span>
							{categories.map((item, idx) => (
								<span
									onClick={() => HandleSearch(item.name)}
									className="a_category a_link p-2 text-xl font-semibold text-primary-lightblue cursor-pointer"
									key={idx}
								>
									{item.name}
								</span>
							))}
						</div>
					)}
				</>
			)}
		</>
	);
};

export default CategoryModel;
