import { z } from 'zod';

export const RegisterSchema = z
	.object({
		userName: z.string().min(1, { message: 'username required' }),
		firstName: z.string().min(1, { message: 'First name required' }),
		lastName: z.string().min(1, { message: 'Last name required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
			message:
				'Password must be at least 8 characters long and include a lowercase letter & uppercase letters, and a digit.',
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password do not match',
		path: ['confirmPassword'],
	});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
