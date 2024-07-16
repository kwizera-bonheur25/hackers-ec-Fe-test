import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(5, { message: 'Password must be 5 or more characters long' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
