import { DynamicData } from './DynamicData';

export interface ProductState {
	isLoading: boolean;
	products: DynamicData[];
	error: string | null;
	singleProduct: DynamicData;
}
export interface ProductDeleteState {
	isLoading: boolean;
	products: DynamicData[];
	error: string | null;
	singleProduct: DynamicData;
}
