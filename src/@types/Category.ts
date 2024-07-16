import { DynamicData } from './DynamicData';

export interface CategoryState {
	isLoading: boolean;
	categories: DynamicData[];
	error: string | null;
}
