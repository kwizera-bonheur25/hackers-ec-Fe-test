import { JwtPayload } from 'jwt-decode';

export interface userType {
	id?: string;
	userName?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmPasswor?: string;
	role?: string;
	isVerified?: boolean;
	isPasswordExpired?: boolean;
	lastTimePasswordUpdated?: Date;
	isActive?: boolean;
	gender?: string;
	birthDate?: Date;
	phoneNumber?: string;
	preferredLanguage?: string;
	preferredCurrency?: string;
	profileImage?: string;
	addressLine1?: string;
	addressLine2?: string;
	country?: string;
	city?: string;
	zipCode?: number;
}

export interface UserInfoTypes extends JwtPayload {
	id?: string;
	role?: string;
	iat?: number;
	exp?: number;
}
