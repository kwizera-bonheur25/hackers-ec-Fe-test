import { z } from 'zod';

export const ResetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: 'The password field cannot be empty' })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
				message: '8 character password with lowercase, uppercase, and a digit.',
			}),
		confirmPassword: z
			.string()
			.min(1, { message: 'The Confirm password field cannot be empty' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export type ResetPasswordPayload = Pick<ResetPasswordSchemaType, 'password'>;
