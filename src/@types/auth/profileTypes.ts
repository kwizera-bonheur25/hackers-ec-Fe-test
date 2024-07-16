/* eslint-disable @typescript-eslint/no-explicit-any */
export type ProfileState = {
	isLoading: boolean;
	data: UserProfile | null;
	error: string | null;
};
export type UserProfile = {
	addressLine1?: any;
	addressLine2?: string;
	birthDate?: string;
	city?: string;
	country?: string;
	email?: string;
	firstName?: string;
	gender?: string;
	lastName?: string;
	phoneNumber?: string;
	preferredCurrency?: string;
	preferredLanguage?: string;
	profileImage?: string;
	zipCode?: any;
};
