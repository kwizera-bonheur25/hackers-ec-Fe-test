import { DynamicData } from './DynamicData';

export type searchState = {
	isLoading: boolean;
	error: string | null;
	searchInputs: searchInputs;
	data: DynamicData[];
};

export type searchInputs = {
	name?: string | null;
	minPrice?: string | null;
	maxPrice?: string | null;
	categoryName?: string | null;
};
