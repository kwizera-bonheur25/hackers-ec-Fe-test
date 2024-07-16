import { z } from 'zod';

export const updateUserRoleSchema = z.object({
	role: z
		.string({
			message: 'role must be a string',
		})
		.nonempty({ message: 'Role is required' }),
});

export type updateUserRoleSchemaType = z.infer<typeof updateUserRoleSchema>;
