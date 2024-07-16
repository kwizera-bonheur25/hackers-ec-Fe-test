import { DynamicData } from './DynamicData';

export type ProductState = {
	isLoading: boolean;
	data: DynamicData | null;
	error: string | null;
};
