import { z } from 'zod';

export const EnableDisableSchema = z.object({
	reason: z
		.string({ message: 'Reason must be a string' })
		.nonempty({ message: 'Reason field is required' }),
});

export type EnableDisableSchemaType = z.infer<typeof EnableDisableSchema>;
