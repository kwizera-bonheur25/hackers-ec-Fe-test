export interface LoginState {
	isLoading: boolean;
	isAuthenticated: boolean;
	error: string | null;
	message: string | null;
	requires2FA: boolean;
}

export type OTPState = {
	isLoading: boolean;
	isAuthenticated: boolean;
	error: string | null;
	message: string | null;
};

export interface Props {
	otp: string;
	token: string;
}
