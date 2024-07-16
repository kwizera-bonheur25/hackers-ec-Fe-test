/* eslint-disable @typescript-eslint/no-explicit-any */
export type passwordState = {
	isLoading: boolean;
	data: UserPassword | null;
	error: string | null;
};
export type UserPassword = {
	oldPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
};
