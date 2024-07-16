import { z } from 'zod';

export const UserUpdateSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email({ message: 'Invalid email address' }).optional(),
	gender: z.string().optional(),
	phoneNumber: z.string().optional(),
	birthDate: z.string().optional(),
	preferredLanguage: z.string().optional(),
	profileImage: z.string().url().optional(),
	preferredCurrency: z.string().optional(),
	country: z.string().optional(),
	city: z.string().optional(),
	addressLine1: z.string().optional(),
	addressLine2: z.string().optional(),
	zipCode: z.string().optional(),
});

export type UserUpdateSchemaType = z.infer<typeof UserUpdateSchema>;
