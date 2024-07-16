import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const PasswordUpdateSchema = z
	.object({
		oldPassword: z
			.string()
			.min(1, "Password field can't be empty")
			.regex(
				passwordRegex,
				'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
			),
		newPassword: z
			.string()
			.min(1, "Password field can't be empty")
			.regex(
				passwordRegex,
				'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
			),
		confirmPassword: z.string().min(1, "Password field can't be empty"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'New password and confirm password do not match',
		path: ['confirmPassword'],
	});

export type PasswordUpdateSchemaType = z.infer<typeof PasswordUpdateSchema>;
