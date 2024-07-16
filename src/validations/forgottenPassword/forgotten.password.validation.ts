import { z } from 'zod';

export const ForgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'The email field cannot be empty' })
		.email({ message: 'Invalid Email' }),
});

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;
